import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;
const dataDir = path.join(__dirname, 'data');
const uploadDir = path.join(dataDir, 'uploads');
const dbPath = path.join(dataDir, 'db.json');
fs.mkdirSync(uploadDir, { recursive: true });
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(uploadDir));

const initial = {
  users: [
    { id: 'admin-1', role: 'admin', username: 'admin', password: 'admin123', name: 'Administrator' },
    { id: 'stu-1001', role: 'student', username: '1001', password: 'student123', name: 'Aarav Sharma', rollNo: '1001', className: 'B.Tech CSE', year: '3rd Year', section: 'A' },
    { id: 'stu-1002', role: 'student', username: '1002', password: 'student123', name: 'Diya Verma', rollNo: '1002', className: 'B.Tech CSE', year: '3rd Year', section: 'A' }
  ],
  attendance: [
    { id: 'att-1', studentId: 'stu-1001', date: new Date().toISOString().slice(0,10), status: 'Present' },
    { id: 'att-2', studentId: 'stu-1002', date: new Date().toISOString().slice(0,10), status: 'Absent' }
  ],
  assignments: [],
  submissions: []
};
if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, JSON.stringify(initial, null, 2));
const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const writeDB = db => fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
const safeUser = u => { const { password, ...rest } = u; return rest; };
const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${path.extname(file.originalname).toLowerCase()}`)
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.pdf', '.doc', '.docx', '.ppt', '.pptx'].includes(ext)) cb(null, true);
    else cb(new Error('Only PDF, DOC, DOCX, PPT, and PPTX files are allowed.'));
  }
});
const requireRole = role => (req, res, next) => {
  const db = readDB();
  const user = db.users.find(u => u.id === req.headers['x-user-id']);
  if (!user || (role && user.role !== role)) return res.status(401).json({ error: 'Please log in with the correct account.' });
  req.user = user; next();
};

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.post('/api/login', (req, res) => {
  const { username, password, role } = req.body || {};
  const db = readDB();
  const user = db.users.find(u => u.username === String(username || '').trim() && u.password === password && u.role === role);
  if (!user) return res.status(401).json({ error: 'Invalid credentials. Please try again.' });
  res.json({ user: safeUser(user) });
});
app.get('/api/me', requireRole(), (req, res) => res.json({ user: safeUser(req.user) }));

app.get('/api/students', requireRole('admin'), (req, res) => {
  const db = readDB();
  res.json(db.users.filter(u => u.role === 'student').map(safeUser));
});
app.post('/api/students', requireRole('admin'), (req, res) => {
  const { name, className, year, section, rollNo, password } = req.body || {};
  if (![name, className, year, section, rollNo].every(v => String(v || '').trim())) return res.status(400).json({ error: 'Please fill in all student fields.' });
  const db = readDB();
  if (db.users.some(u => u.username === String(rollNo).trim())) return res.status(409).json({ error: 'That roll number already exists.' });
  const student = { id: `stu-${crypto.randomUUID()}`, role: 'student', username: String(rollNo).trim(), password: password || 'student123', name: name.trim(), className: className.trim(), year: year.trim(), section: section.trim(), rollNo: String(rollNo).trim() };
  db.users.push(student); writeDB(db); res.status(201).json({ student: safeUser(student) });
});
app.delete('/api/students/:id', requireRole('admin'), (req, res) => {
  const db = readDB();
  const student = db.users.find(u => u.id === req.params.id && u.role === 'student');
  if (!student) return res.status(404).json({ error: 'Student not found.' });
  db.users = db.users.filter(u => u.id !== student.id);
  db.attendance = db.attendance.filter(a => a.studentId !== student.id);
  db.submissions = db.submissions.filter(s => s.studentId !== student.id);
  writeDB(db); res.json({ ok: true });
});

app.get('/api/attendance', requireRole(), (req, res) => {
  const db = readDB();
  const students = db.users.filter(u => u.role === 'student');
  const rows = db.attendance.filter(a => req.user.role === 'admin' || a.studentId === req.user.id)
    .map(a => ({ ...a, student: safeUser(students.find(s => s.id === a.studentId) || { name: 'Deleted student' }) }));
  res.json(rows.sort((a,b) => b.date.localeCompare(a.date)));
});
app.post('/api/attendance/bulk', requireRole('admin'), (req, res) => {
  const { date, records } = req.body || {};
  if (!date || !Array.isArray(records)) return res.status(400).json({ error: 'Date and attendance records are required.' });
  const db = readDB();
  for (const record of records) {
    if (!db.users.some(u => u.id === record.studentId && u.role === 'student')) continue;
    db.attendance = db.attendance.filter(a => !(a.studentId === record.studentId && a.date === date));
    db.attendance.push({ id: `att-${crypto.randomUUID()}`, studentId: record.studentId, date, status: record.status === 'Absent' ? 'Absent' : 'Present' });
  }
  writeDB(db); res.json({ ok: true });
});

app.get('/api/assignments', requireRole(), (req, res) => {
  const db = readDB();
  const assignments = db.assignments.map(a => ({
    ...a,
    submitted: db.submissions.some(s => s.assignmentId === a.id && s.studentId === req.user.id),
    submissionsCount: db.submissions.filter(s => s.assignmentId === a.id).length
  }));
  res.json(assignments.sort((a,b) => b.createdAt.localeCompare(a.createdAt)));
});
app.post('/api/assignments', requireRole('admin'), upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Please attach an assignment file.' });
  const { title, description, dueDate } = req.body;
  if (!title?.trim()) { fs.unlinkSync(req.file.path); return res.status(400).json({ error: 'Assignment title is required.' }); }
  const db = readDB();
  const item = { id: `as-${crypto.randomUUID()}`, title: title.trim(), description: description || '', dueDate: dueDate || '', fileName: req.file.originalname, fileUrl: `/uploads/${req.file.filename}`, createdAt: new Date().toISOString() };
  db.assignments.push(item); writeDB(db); res.status(201).json(item);
});
app.delete('/api/assignments/:id', requireRole('admin'), (req, res) => {
  const db = readDB(); const item = db.assignments.find(a => a.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Assignment not found.' });
  db.assignments = db.assignments.filter(a => a.id !== item.id);
  db.submissions = db.submissions.filter(s => s.assignmentId !== item.id);
  writeDB(db);
  const filePath = path.join(uploadDir, path.basename(item.fileUrl));
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  res.json({ ok: true });
});
app.get('/api/submissions', requireRole('admin'), (req, res) => {
  const db = readDB();
  res.json(db.submissions.map(s => ({ ...s, student: safeUser(db.users.find(u => u.id === s.studentId) || { name: 'Deleted student' }), assignment: db.assignments.find(a => a.id === s.assignmentId) || null })).sort((a,b) => b.submittedAt.localeCompare(a.submittedAt)));
});
app.post('/api/assignments/:id/submit', requireRole('student'), upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Please attach your completed assignment.' });
  const db = readDB();
  if (!db.assignments.some(a => a.id === req.params.id)) { fs.unlinkSync(req.file.path); return res.status(404).json({ error: 'Assignment not found.' }); }
  const existing = db.submissions.find(s => s.assignmentId === req.params.id && s.studentId === req.user.id);
  if (existing) {
    const oldPath = path.join(uploadDir, path.basename(existing.fileUrl));
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    db.submissions = db.submissions.filter(s => s.id !== existing.id);
  }
  const submission = { id: `sub-${crypto.randomUUID()}`, assignmentId: req.params.id, studentId: req.user.id, fileName: req.file.originalname, fileUrl: `/uploads/${req.file.filename}`, submittedAt: new Date().toISOString() };
  db.submissions.push(submission); writeDB(db); res.status(201).json(submission);
});

app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ error: 'File is too large. Maximum size is 10 MB.' });
  res.status(400).json({ error: err.message || 'Something went wrong.' });
});
app.listen(PORT, () => console.log(`CampusDesk API running at http://localhost:${PORT}`));
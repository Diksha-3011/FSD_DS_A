# CampusDesk — Student & Admin Portal

A ready-to-run React + Express application using a local JSON file as its database. It is based on the notebook requirements: admin login, add/delete students, mark attendance, upload assignments, student login, view attendance, and submit assignment files.

## Requirements
- Node.js 18 or newer
- npm

## Run locally
1. Extract the ZIP.
2. Open a terminal in the extracted `student-admin-portal` folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the API and React development server:
   ```bash
   npm run dev
   ```
5. Open **http://localhost:5173** in your browser.

The API runs on `http://localhost:4000`. The JSON database is automatically created at `server/data/db.json`; uploaded files are stored in `server/data/uploads/`.

## Demo accounts
| Role | Username / Roll no. | Password |
|---|---|---|
| Admin | `admin` | `admin123` |
| Student | `1001` | `student123` |
| Student | `1002` | `student123` |

Choose the correct role on the sign-in screen before logging in.

## Features
### Admin
- Dashboard with student, attendance, assignment and submission counts.
- Create student profiles with name, roll number, class, year, section and initial password.
- Search the student directory and delete student records.
- Mark daily attendance as Present / Absent and save by date.
- Publish assignment files (PDF, DOC, DOCX, PPT, PPTX; maximum 10 MB), add instructions and due dates.
- Review submitted files and download/open them.

### Student
- Personal dashboard and attendance percentage.
- View attendance history.
- View and download assignment files.
- Upload a completed assignment file; a later submission replaces the previous submission for that assignment.

## JSON data and reset
The JSON database is for local demo / coursework use, not a multi-user production deployment. To reset demo data, stop the server and delete `server/data/db.json`; restart the server and it will recreate seed data. Back up `server/data/uploads/` if you need uploaded files.

## Important production note
This project intentionally uses a simple JSON file database and demo passwords to keep setup easy. Before deploying publicly, replace plaintext passwords with hashed passwords, add real session/JWT authentication and authorization, use a proper database, configure secure file validation/storage, and add backups. Do not expose this demo instance to the public internet as-is.

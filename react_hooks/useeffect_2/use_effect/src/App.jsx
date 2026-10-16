import React from 'react'

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  useEffect(() => {
    console.log('Form Data Updated:', formData);
  }, [formData]);
  return (
    <div>
      <form action=""> 
        <input type="text" name="name" placeholder='Enter your name' value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <br/>
        <input type="text" name="email" placeholder='Enter your email' value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <br/>
        <input type="password" name="password" placeholder='Enter your password' value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
        <br/>
        <button type="submit">Register</button>
      </form>
    </div>
  )
  
}

export default App
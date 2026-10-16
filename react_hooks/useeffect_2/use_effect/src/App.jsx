import React,{useState,useEffect} from 'react'

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  useEffect(() => {
    console.log('Form Data Updated:', formData);
  }, [formData]);
  const handleSubmit = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('registered successfully');
    console.log('Form Submitted:', formData);
  }
  return (
    <div>
      <form action="" onSubmit={handleFormSubmit}> 
        <input type="text" name="name" placeholder='Enter your name' value={formData.name} onChange={handleSubmit} />
        <br/>
        <input type="text" name="email" placeholder='Enter your email' value={formData.email} onChange={handleSubmit} />
        <br/>
        <input type="password" name="password" placeholder='Enter your password' value={formData.password} onChange={handleSubmit} />
        <br/>
        <button type="submit">Register</button>
      </form>
    </div>
  )
  
}

export default App
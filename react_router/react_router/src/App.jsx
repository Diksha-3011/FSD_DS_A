import React from 'react'
function Home(){
  return <h1>This is my Home page</h1>
}
function About(){
  return <h1>This is my About page</h1>
}
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </BrowserRouter>
    </div>
  )
}

export default App
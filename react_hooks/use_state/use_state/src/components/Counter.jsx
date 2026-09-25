import React, { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h3>Counter-App</h3>
      <br />

      <button onClick={() => setCount(count + 1)}>+</button>

      <span>{count}</span>

      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  )
}

export default Counter
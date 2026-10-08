import React, { useState } from 'react'

const Counter = () => {
  const [height, setHeight] = useState(200)
  const [width, setWidth] = useState(200)
  const [rows, setRows] = useState(1)
  const [columns, setColumns] = useState(1)

  const increaseHeight = () => {
    setHeight(height + 20)
  }

  const decreaseHeight = () => {
    setHeight(height - 20)
  }

  const increaseWidth = () => {
    setWidth(width + 20)
  }

  const decreaseWidth = () => {
    setWidth(width - 20)
  }

  const increaseRows = () => {
    setRows(rows + 1)
  }

  const decreaseRows = () => {
    setRows(rows - 1)
  }

  const increaseColumns = () => {
    setColumns(columns + 1)
  }

  const decreaseColumns = () => {
    setColumns(columns - 1)
  }

  return (
    <div>
      <h3>Image Controller</h3>


      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvRn4sjaG7eO2j-CUqr9q2x2DXPQ0-E2GQC3DwZV3sbA&s=10"
        alt="sample"
        style={{
          height: `${height}px`,
          width: `${width}px`
        }}
      />

      <p>Height: {height}px</p>
      <button onClick={increaseHeight}>+</button>
      <button onClick={decreaseHeight}>-</button>

      <p>Width: {width}px</p>
      <button onClick={increaseWidth}>+</button>
      <button onClick={decreaseWidth}>-</button>

      <p>Rows: {rows}</p>
      <button onClick={increaseRows}>+</button>
      <button onClick={decreaseRows}>-</button>

      <p>Columns: {columns}</p>
      <button onClick={increaseColumns}>+</button>
      <button onClick={decreaseColumns}>-</button>

      <br /><br />

      
    </div>
  )
}

export default Counter
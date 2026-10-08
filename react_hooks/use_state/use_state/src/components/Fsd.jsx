import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);

  const addName = () => {
    if (name.trim() === "") return;

    setNames([...names, name]);
    setName("");
  };

  const deleteName = (index) => {
    const updatedNames = names.filter((_, i) => i !== index);
    setNames(updatedNames);
  };

  return (
    <div>
      <h2>Add Names</h2>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={addName}>Add Name</button>

      <h3>Added Names:</h3>

      {names.map((item, index) => (
        <div key={index}>
          <span>{item}</span>

          <button onClick={() => deleteName(index)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
import React from 'react';
import {useContext,createContext} from 'react';

function mycontext() {
  const myname = createContext("arjun");
  const value=useContext(myname);
  return (
    <div>
      <h1>my name is {value}</h1>
    </div>
  )
}

export default mycontext;
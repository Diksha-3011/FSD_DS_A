import React from 'react'

const Card = () => {
  return (
    <div>
        <center>
        <div style={{ border: '2px solid black', width: '400px',height: '400px', backgroundColor: 'lightblue',borderRadius:'10px' }}>

           <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjY4Ni0yNTMteC5qcGc.jpg" alt="Student Image" style={{ width: '50px', height: '50px'}} />
            <h2 style={{ color: 'White',textAlign: 'center' }}>ABES STUDENT CARD</h2>
           
            

            <p style={{ color: 'black',textAlign: 'center' }}>Mathematics</p>
            <p style={{ color: 'black',textAlign: 'center' }}>Roll No : 12345</p>
            <p style={{ color: 'black',textAlign: 'center' }}>Branch : Computer Science</p>

            
        </div>
        </center>

    </div>
  )
}

export default Card
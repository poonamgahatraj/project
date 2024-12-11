import React from 'react';
import { useState } from 'react';

export default function EstimateDetails({  onBack,handlenextstep}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div >
            <div style={{display:"flex",alignItems:"center",gap:"10px"}} onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onBack} >
<img src='./images/arrow-left.svg' style={{height:"10px",width:"10px",position: "relative",
            left: isHovered ? "-5px" : "0px", // Move left when hovered
            transition: "left 0.2s ease"}}></img>
<p style={{ cursor: 'pointer',fontWeight:"bold",fontSize:"12px" }}  >Back to basic details</p>
        </div>
        <hr></hr>

     <p style={{fontSize:"14px"}}>Enter estimate details here</p>
      <div>
        <label style={{fontWeight:"bold",fontSize:"14px"}}>Estimate Title (Required):</label>
        <input
          type="text"
          
         placeholder='Enter title here'
          style={{width:"100%",padding:"10px",boxSizing:"border-box",margin:"10px 0",outline:"none",border:"1px solid #E0DFDF",borderRadius:"5px"}}
        />
      </div>

      {/* Customer Order Number */}
      <div>
        <label style={{fontWeight:"bold",fontSize:"14px"}}>Customer Order Number:</label><br></br>
        <input
          type="number"
          
        placeholder='Enter order number here'
          style={{width:"100%",padding:"10px",boxSizing:"border-box",margin:"10px 0",outline:"none",border:"1px solid #E0DFDF",borderRadius:"5px"}}
        />
      </div>

      {/* Pick a Date */}
      <div>
        <label style={{fontWeight:"bold",fontSize:"14px"}}>Pick a Date:</label><br></br>
        <p style={{margin:"5px 0px ",fontSize:"13px"}}>Please choose a suitable estimate date.</p>
        <input
          type="date"
         
          style={{width:"100%",padding:"10px",boxSizing:"border-box",margin:"10px 0",border:"1px solid #E0DFDF",outline:"none",borderRadius:"5px"}}
          
        />
      </div>

      {/* Valid */}
      <div>
        <label style={{fontWeight:"bold",fontSize:"14px"}}>Valid </label><br></br>
        <input
          type="number"
         
          placeholder='30'
          
          style={{width:"100%",padding:"10px",boxSizing:"border-box",margin:"10px 0",border:"1px solid #E0DFDF",outline:"none",borderRadius:"5px"}}
        />
      </div>

      {/* Next Step Button */}
      <div style={{position:'fixed',bottom:"0",width:"28%",marginBottom:"0.5%"}} >
        <hr />
        <button
          style={{
            width: '100%',
            padding: '15px',
            border: 'none',
            backgroundColor: '#D15B2C',
            color: 'white',
            fontSize: '16px',
            margin:"10px 0px"
          }}
          onClick={handlenextstep}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

import React from 'react';

export default function EstimateDetails({ formData, onFormDataChange, onNextStep , onBackToBasicDetails}) {
  return (
    <div >
            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
<img src='./images/arrow-left.svg' style={{height:"10px",width:"10px"}}></img>
<p style={{ cursor: 'pointer',fontWeight:"bold",fontSize:"12px" }} onClick={onBackToBasicDetails}>Back to basic details</p>
        </div>
        <hr></hr>

     <p>Enter estimate details here</p>
      <div>
        <label style={{fontWeight:"bold"}}>Estimate Title (Required):</label>
        <input
          type="text"
          value={formData.estimate_title}
          onChange={(e) => onFormDataChange('estimate_title', e.target.value)}
          style={{width:"100%",padding:"10px",boxSizing:"border-box",margin:"10px 0",border:"1px solid #E0DFDF"}}
        />
      </div>

      {/* Customer Order Number */}
      <div>
        <label style={{fontWeight:"bold"}}>Customer Order Number:</label><br></br>
        <input
          type="number"
          value={formData.customer_order_number}
          onChange={(e) => onFormDataChange('customer_order_number', e.target.value)}
          style={{width:"100%",padding:"10px",boxSizing:"border-box",margin:"10px 0",border:"1px solid #E0DFDF"}}
        />
      </div>

      {/* Pick a Date */}
      <div>
        <label style={{fontWeight:"bold"}}>Pick a Date:</label><br></br>
        <p style={{margin:"5px 0px ",fontSize:"13px"}}>Please choose a suitable estimate date.</p>
        <input
          type="date"
          value={formData.estimated_date}
          onChange={(e) => onFormDataChange('estimated_date', e.target.value)}
          style={{width:"100%",padding:"10px",boxSizing:"border-box",margin:"10px 0",border:"1px solid #E0DFDF"}}
        />
      </div>

      {/* Valid */}
      <div>
        <label style={{fontWeight:"bold"}}>Valid </label><br></br>
        <input
          type="number"
          value={formData.valid_days}
          onChange={(e) => onFormDataChange('valid_days', e.target.value)}
          style={{width:"100%",padding:"10px",boxSizing:"border-box",margin:"10px 0",border:"1px solid #E0DFDF"}}
        />
      </div>

      {/* Next Step Button */}
      <div style={{position:"fixed",bottom:"0",width:"30%"}} >
        <hr ></hr>

{/* Next Step Button */}
<button onClick={onNextStep} style={{width:"100%",padding:'15px',border:"none" ,backgroundColor: "#D15B2C",color:"white",fontSize:"16px"}}>Next Step</button>
        </div>
    </div>
  );
}

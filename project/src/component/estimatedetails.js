import React from 'react';

export default function EstimateDetails({ formData, onFormDataChange, onNextStep }) {
  return (
    <div>
     <p>Back to basic details</p>

     <p>Enter estimate details here</p>
      <div>
        <label>Estimate Title (Required):</label>
        <input
          type="text"
          value={formData.estimate_title}
          onChange={(e) => onFormDataChange('estimate_title', e.target.value)}
          style={{width:"100%",padding:"10px",boxSizing:"border-box"}}
        />
      </div>

      {/* Customer Order Number */}
      <div>
        <label>Customer Order Number:</label><br></br>
        <input
          type="number"
          value={formData.customer_order_number}
          onChange={(e) => onFormDataChange('customer_order_number', e.target.value)}
          style={{width:"100%",padding:"10px",boxSizing:"border-box"}}
        />
      </div>

      {/* Pick a Date */}
      <div>
        <label>Pick a Date:</label><br></br>
        <input
          type="date"
          value={formData.estimated_date}
          onChange={(e) => onFormDataChange('estimated_date', e.target.value)}
          style={{width:"100%",padding:"10px",boxSizing:"border-box"}}
        />
      </div>

      {/* Valid */}
      <div>
        <label>Valid (No. of days):</label><br></br>
        <input
          type="number"
          value={formData.valid_days}
          onChange={(e) => onFormDataChange('valid_days', e.target.value)}
          style={{width:"100%",padding:"10px",boxSizing:"border-box"}}
        />
      </div>

      {/* Next Step Button */}
      <button onClick={onNextStep}>Next Step</button>
    </div>
  );
}

import React from 'react';

export default function BasicDetails({ formData, onFormDataChange, onNextStep }) {
  return (
    <div>
      <p>Let’s start with basic details.</p>

      {/* Client Name */}
      <div>
        <label>Client Name:</label><br></br>
        <input
          type="text"
          value={formData.client_name}
          onChange={(e) => onFormDataChange('client_name', e.target.value)}
          style={{width:"100%",padding:"10px",boxSizing:"border-box"}}
        />
      </div>

      {/* Sales Person */}
      <div>
        <label>Sales Person:</label><br></br>
        <input
          type="text"
          value={formData.sales_person}
          onChange={(e) => onFormDataChange('sales_person', e.target.value)}
          style={{width:"100%",padding:"10px",boxSizing:"border-box"}}
        />
      </div>

      {/* Department Name */}
      <div>
        <label>Department Name:</label><br></br>
        <input
          type="text"
          value={formData.department_name}
          onChange={(e) => onFormDataChange('department_name', e.target.value)}
          style={{width:"100%",padding:"10px",boxSizing:"border-box"}}
        />
      </div>

      {/* Contact Name */}
      <div>
        <label>Contact Name:</label><br></br>
        <input
          type="text"
          value={formData.contact_name}
          onChange={(e) => onFormDataChange('contact_name', e.target.value)}
          style={{width:"100%",padding:"10px",boxSizing:"border-box"}}
        />
      </div>

      {/* Address */}
      <div>
        <label>Address:</label><br></br>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => onFormDataChange('address', e.target.value)}
          style={{width:"100%",padding:"10px",boxSizing:"border-box"}}
        />
      </div>

      {/* Next Step Button */}
      <button onClick={onNextStep}>Next Step</button>
    </div>
  );
}

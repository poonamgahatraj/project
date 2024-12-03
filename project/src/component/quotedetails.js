import React from 'react';

export default function QuoteDetails({ formData, onFormDataChange, onCreateEstimate }) {
  return (
    <div>
      <h2>Quote Details</h2>
      <div>
        <label>Estimate Type:</label>
        <input
          type="text"
          value={formData.estimate_type}
          onChange={(e) => onFormDataChange('estimate_type', e.target.value)}
        />
      </div>
      <p>You can add any one or multiple quotes at the same time.</p>

      {/* Create Estimate Button */}
      <button onClick={onCreateEstimate}>Create Estimate</button>
    </div>
  );
}

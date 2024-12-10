import React, { useState, useEffect } from 'react';
import axios from 'axios'

export default function QuoteDetails({ formData, onFormDataChange, onCreateEstimate,onBackToEstimateDetails }) {

    const [showDropdown, setShowDropdown] = useState(false); // Manage dropdown visibility
  const [quotes, setQuotes] = useState([]); // Store fetched quote details

  useEffect(() => {
    if (showDropdown) {
      axios
        .get('http://localhost:3001/api/quotes') // Replace with your API endpoint
        .then((response) => {
          setQuotes(response.data);
        })
        .catch((error) => {
          console.error('Error fetching quotes:', error);
        });
    }
  }, [showDropdown]);

  return (
    <div>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
<img src='./images/arrow-left.svg' style={{height:"10px",width:"10px"}}></img>
<p style={{ cursor: 'pointer',fontWeight:"bold" }} onClick={onBackToEstimateDetails}>Back to estimate details</p>
        </div>
        
      <h2>Quote Details</h2>
     
        <p>Estimate Type</p>
       
      
      <p>You can add any one or multiple quotes at the same time.</p>

      <div style={{display:"flex",gap:"15px",alignItems:"center"}} onClick={() => setShowDropdown((prev) => !prev)} >
        <button >+</button>
        <p>Add new estimate</p>

      </div>

      {showDropdown && (
        <ul style={{ border: '1px solid #ccc', padding: '10px', listStyle: 'none' }}>
          {quotes.length > 0 ? (
            quotes.map((quote) => (
              <li key={quote.quote_id} style={{ padding: '5px 0' }}>
                {quote.name}
              </li>
            ))
          ) : (
            <li>No quotes available.</li>
          )}
        </ul>
      )}
      {/* Create Estimate Button */}
      <button onClick={onCreateEstimate}style={{width:"100%",padding:'10px',border:"none" ,backgroundColor: "#D15B2C"}}>Create Estimate</button>
    </div>
  );
}

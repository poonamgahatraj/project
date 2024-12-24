import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './quotedetails.module.css';

export default function QuoteDetails({ quoteDetails, setDetails, onBack,onCreate }) {
  const [showDropdown, setShowDropdown] = useState(false); // Manage dropdown visibility
  const [quotes, setQuotes] = useState([]); // Store fetched quote details
  const [isHovered, setIsHovered] = useState(false);

  // Fetch quotes when the dropdown is shown
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

  // Function to handle selecting a quote
  const handleSelectQuote = (quote) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      quoteDescription: quote.name, // Update the quote description with the selected quote's name
    }));
  };

  return (
    <div >
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0px 20px' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onBack}
      >
        <img
          src='./images/blackarrow.jpg'
          style={{
            height: '20px',
            width: '15px',
            position: 'relative',
            left: isHovered ? '-5px' : '0px', // Move left when hovered
            transition: 'left 0.2s ease',
          }}
        ></img>
        <p style={{ cursor: 'pointer', fontWeight: '500', fontSize: '14px' }} onClick={onBack}>
          Back to estimate details
        </p>
      </div>
      <div style={{ width: '100%', border: '0.5px solid #E0DFDF' }}></div>

      <div style={{ padding: '0px 20px' }}>
        <p style={{ fontSize: '16px', fontWeight: '500' }}>Estimate Type</p>
        <p style={{ fontSize: '15px' }}>
          You can add any one or multiple quotes at the same time.
        </p>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }} onClick={() => setShowDropdown((prev) => !prev)}>
          <button style={{ border: 'none', border: '1px solid #E8E8E8', backgroundolor: "WHITE", height: '30px', width: '30px',display:"flex",justifyContent:"center",alignItems:"center",opacity:"1"}}onMouseOver={(e) => e.target.style.backgroundColor = "rgba(224, 223, 223, 0.5)" } onMouseOut={(e) => e.target.style.backgroundColor = "white"}
  >
          +
          </button>
          <p style={{ fontSize: '14px',opacity:1,fontWeight:"500" }}>Add New Estimate</p>
        </div>

        {showDropdown && (
          <ul style={{ border: '1px solid #ccc', padding: '10px',fontSize:"14px", listStyle: 'none', width: '35%', cursor: 'pointer', margin: '0' ,boxShadow: "-10px 20px 20px #4343430D"}} >
            {quotes.length > 0 ? (
              quotes.map((quote) => (
                <li key={quote.quote_id} style={{ padding: '10px' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(224, 223, 223, 0.5)'} // Change to grey with opacity on hover
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(224, 223, 223, 0)'}  onClick={() => handleSelectQuote(quote)}>
                  {quote.name}
                </li>
              ))
            ) : (
              <li>No quotes available.</li>
            )}
          </ul>
        )}
      </div>

      {/* Create Estimate Button */}
      <div style={{ position: "relative", minHeight: "100vh" }}>
  {/* Content Area */}
  

  {/* Footer Area */}
  <div
    style={{
      position: "fixed",
      bottom: "0",
      
      width: "35%",
      background: "#fff", // Optional for a consistent background
    }}
  >
    {/* Divider */}
    <div style={{ width: "100%", border: "0.5px solid #E0DFDF" }}></div>

    {/* Button Area */}
    <div
      style={{
        padding: "18px 20px",
        boxSizing: "border-box",
        display: "flex", // Optional for aligning content
        justifyContent: "flex-start", // Adjust alignment as needed
      }}
    >
      <button className={styles.btn} onClick={onCreate}>
        Create Estimate
      </button>
    </div>
  </div>
</div>



      
    </div>
  );
}

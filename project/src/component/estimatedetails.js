import React, { useState } from 'react';
import styles from './estimatedetails.module.css';

export default function EstimateDetails({ details, setDetails, onBack, handlenextstep }) {
  const [isHovered, setIsHovered] = useState(false);

  // Handle input change to update estimate details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,  // Update the specific field based on input name
    }));
  };

  return (
    <div>
      <div
        style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0px 20px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onBack}
      >
        <img
          src='./images/arrow-left.svg'
          style={{
            height: "10px",
            width: "10px",
            position: "relative",
            left: isHovered ? "-5px" : "0px",
            transition: "left 0.2s ease"
          }}
          alt="back arrow"
        />
        <p style={{ cursor: 'pointer', fontWeight: "bold", fontSize: "14px" }}>Back to basic details</p>
      </div>
      <div style={{ width: "100%", border: "0.5px solid #E0DFDF" }}></div>
      <div style={{ padding: "0px 20px" }}>
        <p style={{ fontSize: "16px" }}>Enter estimate details here</p>

        {/* Estimate Title */}
        <div>
          <label style={{ fontWeight: "bold", fontSize: "16px" }}>Estimate Title (Required):</label>
          <input
            type="text"
            name="estimateTitle"
            value={details.estimateTitle}
            placeholder='Enter title here'
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              boxSizing: "border-box",
              margin: "10px 0",
              outline: "none",
              border: "1px solid #E0DFDF",
              borderRadius: "5px"
            }}
          />
        </div>

        {/* Customer Order Number */}
        <div>
          <label style={{ fontWeight: "bold", fontSize: "16px" }}>Customer Order Number:</label><br />
          <input
            type="number"
            name="orderNumber"
            value={details.orderNumber}
            placeholder='Enter order number here'
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              boxSizing: "border-box",
              margin: "10px 0",
              outline: "none",
              border: "1px solid #E0DFDF",
              borderRadius: "5px"
            }}
          />
        </div>

        {/* Pick a Date */}
        <div>
          <label style={{ fontWeight: "bold", fontSize: "16px" }}>Pick a Date:</label><br />
          <p style={{ margin: "5px 0px ", fontSize: "13px" }}>Please choose a suitable estimate date.</p>
          <input
            type="date"
            name="date"
            value={details.date}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              boxSizing: "border-box",
              margin: "10px 0",
              border: "1px solid #E0DFDF",
              outline: "none",
              borderRadius: "5px"
            }}
          />
        </div>

        {/* Valid */}
        <div>
          <label style={{ fontWeight: "bold", fontSize: "16px" }}>Valid</label><br />
          <input
            type="number"
            name="validity"
            value={details.validity}
            placeholder='30'
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              boxSizing: "border-box",
              margin: "10px 0",
              border: "1px solid #E0DFDF",
              outline: "none",
              borderRadius: "5px"
            }}
          />
        </div>

      </div>

      {/* Next Step Button */}
      <div style={{ position: 'fixed', bottom: '0', width: '35%', padding: "0px 20px 18px 18px", boxSizing: "border-box" }}>
        <div style={{ width: "100%", border: "0.5px solid #E0DFDF" }}></div>
        <button className={styles.btn} onClick={handlenextstep}>
          Next Step
        </button>
      </div>
    </div>
  );
}

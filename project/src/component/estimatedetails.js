import React, { useState } from 'react';
import { DatePicker, Button } from 'antd';
import moment from 'moment';
import styles from './estimatedetails.module.css';

export default function EstimateDetails({ details, setDetails, onBack, handlenextstep }) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedDate, setSelectedDate] = useState(details.date);

  // Handle input change to update estimate details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,  // Update the specific field based on input name
    }));
  };

  // Handle DatePicker change
  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  // Handle Apply button click
  const handleApplyDate = () => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      date: selectedDate,  // Apply selected date to the state
    }));
  };

  // Handle Cancel button click
  const handleCancelDate = () => {
    setSelectedDate(details.date);  // Revert to the previous date
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
          src='./images/blackarrow.jpg'
          style={{
            height: '20px',
            width: '15px',
            position: 'relative',
            left: isHovered ? '-5px' : '0px', // Move left when hovered
            transition: 'left 0.2s ease',
          }}
        />
        <p style={{ cursor: 'pointer', fontSize: "14px", fontWeight: "500" }}>Back to basic details</p>
      </div>
      <div style={{ width: "100%", border: "0.5px solid #E0DFDF" }}></div>
      <div style={{ padding: "0px 20px", paddingBottom: "80px" }}>
        <p style={{ fontSize: "16px" }}>Enter estimate details here</p>

        {/* Estimate Title */}
        <div>
          <label style={{ fontWeight: "500", fontSize: "16px" }}>Estimate Title (Required):</label>
          <input
            type="text"
            name="estimateTitle"
            value={details.estimateTitle}
            placeholder='Enter title here'
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "14px",
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
          <label style={{ fontWeight: "500", fontSize: "16px" }}>Customer Order Number:</label><br />
          <input
            type="number"
            name="orderNumber"
            value={details.orderNumber}
            placeholder='Enter order number here'
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "14px",
              boxSizing: "border-box",
              margin: "10px 0",
              outline: "none",
              border: "1px solid #E0DFDF",
              borderRadius: "5px"
            }}
          />
        </div>

        {/* Pick a Date (Ant Design DatePicker with Custom Buttons) */}
        <div>
          <label style={{ fontWeight: "500", fontSize: "16px" }}>Pick a Date:</label><br />
          <p style={{ margin: "5px 0px ", fontSize: "13px" }}>Please choose a suitable estimate date.</p>
          <DatePicker
            format="MM/DD/YYYY"  // Set the date format to MM/DD/YYYY
            value={selectedDate ? moment(selectedDate, "MM/DD/YYYY") : null} // Ensure the date is in moment format
            onChange={handleDateChange}
            style={{
              width: "100%",
              padding: "14px",
              boxSizing: "border-box",
              margin: "10px 0",
              border: "1px solid #E0DFDF",
              outline: "none",
              borderRadius: "5px"
            }}
            renderExtraFooter={() => (
              <div style={{ textAlign: 'right' }}>
                <Button onClick={handleCancelDate} style={{ marginRight: 10 }}>Cancel</Button>
                <Button type="primary" onClick={handleApplyDate}>Apply</Button>
              </div>
            )}
            disabledDate={(current) => current && current.isSame(moment(), 'day')}  // Disable today's date
          />
        </div>

        {/* Valid */}
        <div style={{ position: "relative", marginBottom: "10px" }}>
          <label style={{ fontWeight: "500", fontSize: "16px" }}>Valid</label><br />
          <input
            type="number"
            name="validity"
            value={details.validity}
            placeholder='30'
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "14px",
              boxSizing: "border-box",
              outline: "none",
              border: "1px solid #E0DFDF",
              borderRadius: "5px",
              margin: "10px 0px"
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "60%",
              right: "10px",
              transform: "translateY(-50%)",
              color: "#888",
              fontSize: "14px",
            }}
          >
            Days
          </span>
        </div>
      </div>

      {/* Next Step Button */}
      <div style={{ position: "relative", minHeight: "100vh" }}>
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
            <button className={styles.btn} onClick={handlenextstep}>
              Next step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

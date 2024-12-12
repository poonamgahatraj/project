import React, { useState, useEffect } from 'react';
import axios from 'axios'
import styles from './quotedetails.module.css'

export default function QuoteDetails({onBack}) {

    const [showDropdown, setShowDropdown] = useState(false); // Manage dropdown visibility
  const [quotes, setQuotes] = useState([]); // Store fetched quote details
  const [isHovered, setIsHovered] = useState(false);

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
    <div >
        <div style={{display:"flex",alignItems:"center",gap:"10px",padding:"0px 20px"}}onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onBack}>
<img src='./images/arrow-left.svg' style={{height:"10px",width:"15px",position: "relative",
            left: isHovered ? "-5px" : "0px", // Move left when hovered
            transition: "left 0.2s ease"}}></img>
<p style={{ cursor: 'pointer',fontWeight:"500" ,fontSize:"14px"}} onClick={onBack}>Back to estimate details</p>
        </div>
        <hr></hr>
        
     
     <div style={{padding:"0px 20px"}}>
     <p style={{fontSize:"16px",fontWeight:"bold"}}>Estimate Type</p>
       
      
       <p style={{fontSize:"15px"}}>You can add any one or multiple quotes at the same time.</p>
 
       <div style={{display:"flex",gap:"15px",alignItems:"center"}} onClick={() => setShowDropdown((prev) => !prev)} >
         <button style={{border:"none",border:"1px solid #E8E8E8",backgroundColor:"#EDEDED00",height:"35px",width:"35px"}} >+</button>
         <p style={{fontSize:"14px",fontWeight:"bold"}}>Add new estimate</p>
 
       </div>
 
       {showDropdown && (
         <ul style={{ border: '1px solid #ccc', padding: '10px', listStyle: 'none',width:"40%",cursor:"pointer",margin:"0" }}>
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
     </div>
       
      {/* Create Estimate Button */}
      <div style={{ position: 'fixed', bottom: '0', width: '33%' ,padding:"0px 20px 18px 18px"}}>
      <hr />
        <button className={styles.btn} >
        Create Estimate
        </button>
      </div>

      
    </div>
  );
}

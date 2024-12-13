import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './estimationform.module.css';
import Headers from './headers';
import Sidenav from './sidenav';

export default function Estimatetable() {
    const [estimates, setEstimates] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from the backend
        axios.get("http://localhost:3001/api/estimates-details")
          .then((response) =>{console.log(response.data); 
            setEstimates(response.data)
          } )
          .catch((error) => console.error("Error fetching estimates:", error));
      }, []);


    const handleNewEstimates = () => {
        navigate('/new-estimates'); // Change the route to /new-estimates
    };

    return (
        <>
        <div style={{width:"100vw",height:"100vh",boxSizing:"border-box",overflow:"hidden"}}>

        
<Headers/>
<div style={{display:"flex",overflow:"hidden"}}>
<Sidenav/>

<div style={{ padding: "0% 5%" ,backgroundColor:"#FDFBFB",width:"95%",border:"1px solid #E0DFDF" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <p style={{fontSize:"22px",fontWeight:"500"}}>Estimates</p>
                        <p style={{fontSize:"18px"}}>Manage the estimate information</p>
                    </div>
                    <div>
                        <button
                            onClick={handleNewEstimates}
                            style={{
                                backgroundColor: "#D15B2C",
                                color: "white",
                                border: "none",
                                padding: "10px",
                                borderRadius:"5px"
                            }}
                        >
                            Add New Estimates
                        </button>
                    </div>
                </div>
                <hr />
                <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
                    <img src='.\images\OIP.jpg' style={{height:"15px",width:"15px"}}></img>
                    <p style={{color:"#2F2F2F",fontSize:"16px"}}>Search by supplier name or contact number or email address</p>
                </div>
                <hr></hr>

                <table style={{ width: '100%', borderCollapse: 'collapse',marginLeft:"0" }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #ccc',height:"50px" }}>
                            <th className={styles.th} >Estimate ID</th>
                            <th className={styles.th} >Client Name</th>
                            <th className={styles.th}>Estimate Title</th>
                            <th className={styles.th}>Customer Order Number</th>
                            <th className={styles.th}>Estimate Type</th>
                            <th className={styles.th}>Sales Person</th>
                            <th className={styles.th}>Estimated Date</th>
                            <th></th> {/* Empty header for the image column */}
                        </tr>
                    </thead>
                    <tbody>
                        {estimates.length > 0 ? (
                            estimates.map((estimate) => (
                                <tr key={estimate.id} style={{ borderBottom: '1px solid #ccc',height:"50px" }}>
                                    <td>{estimate.id}</td>
                                    <td>{estimate.client_name}</td>
                                    <td>{estimate.estimate_title}</td>
                                    <td>{estimate.customer_order_number}</td>
                                    <td>{estimate.estimate_type}</td>
                                    <td>{estimate.sales_person}</td>
                                    <td>{estimate.estimated_date}</td>
                                    <td>
                                        {/* Replace with your actual image source */}
                                        <img
                                            src="./images/dots.png"
                                            alt="icon"
                                            style={{ width: '20px', cursor: 'pointer' }}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr style={{ borderBottom: '1px solid #ccc' }}>
                                <td colSpan="8" style={{ textAlign: 'center' }}>
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{fontSize:"16px",fontWeight:"500"}}>Showing 1-1 of 2 estimates</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <p style={{fontSize:"16px",fontWeight:"500"}}>The page you’re on</p>
                        <div className={styles.pagination} style={{display:"flex",alignItems:"center"}}>
                        <div  >10</div>
                        <img src='.\images\arrow-down-bold.svg' style={{ height: "10px",width:"15px" }}></img>
                        </div>
                        
                        <div className={styles.pagination}>
                            <img src='.\images\back2.webp' style={{ height: "10px",width:"15px" }} alt="left arrow" />
                        </div>
                        <div className={styles.pagination}>
                            <img src='.\images\right.png' style={{ height: "10px",width:"15px" }} alt="right arrow" />
                        </div>
                    </div>
                </div>
                <hr></hr>
            </div>
</div>
</div>
            
        </>
    );
}

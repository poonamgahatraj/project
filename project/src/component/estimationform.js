import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Estimatetable() {
    const [estimates, setEstimates] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:3001/api/estimates')
            .then((response) => {
                setEstimates(response.data); // Store fetched data in state
            })
            .catch((error) => {
                console.error('Error fetching estimates:', error);
            });
    }, []);

    const handleNewEstimates = () => {
        navigate('/new-estimates'); // Change the route to /new-estimates
    };

    return (
        <>
            <div style={{ padding: "2% 5%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <p>Estimates</p>
                        <p>Manage the estimate information</p>
                    </div>
                    <div>
                        <button
                            onClick={handleNewEstimates}
                            style={{
                                backgroundColor: "#D15B2C",
                                color: "white",
                                border: "none",
                                padding: "10px"
                            }}
                        >
                            Add New Estimates
                        </button>
                    </div>
                </div>
                <hr />
                <div>
                    <p>Search by supplier name or contact number or email address</p>
                </div>
                <hr></hr>

                <table style={{ width: '100%', borderCollapse: 'collapse',marginLeft:"0" }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #ccc',height:"30px" }}>
                            <th style={{textAlign:"left"}}>Estimate ID</th>
                            <th style={{textAlign:"left"}}>Client Name</th>
                            <th style={{textAlign:"left"}}>Estimate Title</th>
                            <th style={{textAlign:"left"}}>Customer Order Number</th>
                            <th style={{textAlign:"left"}}>Estimate Type</th>
                            <th style={{textAlign:"left"}}>Sales Person</th>
                            <th style={{textAlign:"left"}}>Estimated Date</th>
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
                    <p>Showing 1-1 of 2 estimates</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <p>The page you’re on</p>
                        <div style={{ border: "1px solid #BCBCBC" }}>10</div>
                        <div style={{ border: "1px solid #BCBCBC" }}>
                            <img src='./images/arrow-left.svg' style={{ height: "15px" }} alt="left arrow" />
                        </div>
                        <div style={{ border: "1px solid #BCBCBC" }}>
                            <img src='./images/arrow-right.svg' style={{ height: "15px" }} alt="right arrow" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

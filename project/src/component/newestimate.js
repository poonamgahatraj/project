import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BasicDetails from './basicdetails';
import EstimateDetails from './estimatedetails';
import QuoteDetails from './quotedetails';

export default function NewEstimate() {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        client_name: '',
        department_name: '',
        contact_name: '',
        salesperson: '',
        address: '',
        estimate_title: '',
        customer_order_number: '',
        estimated_date: '',
        valid_days: '',
        quotes: []
    });
  
    const [currentStep, setCurrentStep] = useState('basicDetails');
  
    const handleFormDataChange = (key, value) => {
        setFormData((prevData) => ({ ...prevData, [key]: value }));
    };
  
    const handleNextStep = () => {
      if (currentStep === 'basicDetails') {
        setCurrentStep('estimateDetails');
      } else if (currentStep === 'estimateDetails') {
        setCurrentStep('quoteDetails');
      }
    };
  
    const handleCreateEstimate = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/submit-estimate', formData);
        console.log(response.data);
      } catch (error) {
        console.error('Error creating estimate:', error);
      }
    };

    const handleClose = () => {
        navigate('/'); // Navigate to the home route
      };
  
    return (
      <div
        style={{
          width: '100%',
          height: '100vh', // Full viewport height
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
          , // Semi-transparent black
         padding:"5%",
         boxSizing:"border-box",
          position: 'relative',
        }}
      >
        <p style={{fontWeight:"bold",fontSize:"18px"}}>Estimates</p>
        <p>Manage the estimate information</p>

        <div
          style={{
            width: '30%',
            padding: '20px',
            backgroundColor: 'white', // Ensure this is opaque for the content
           
            position: 'absolute',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            right:"0",
           top:"0",
            height:"100%",
            boxSizing:"border-box"
          }}
        >
            <div style={{display:"flex",justifyContent:"space-between",alignItems:'center'}}>
            <p style={{fontSize:"14px",fontWeight:"bold"}}>Add Estimate</p>
            <button onClick={handleClose} style={{border:"1px solid",height:"20px",width:"20px", borderRadius:"50px"}}>x</button>
            </div>
            <hr></hr>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <p
              style={{ cursor: 'pointer', fontWeight: currentStep === 'basicDetails' ? 'bold' : 'normal' ,fontSize:"12px"}}
              onClick={() => setCurrentStep('basicDetails')}
            >
              Basic Details
            </p>
            <p
              style={{ cursor: 'pointer', fontWeight: currentStep === 'estimateDetails' ? 'bold' : 'normal',fontSize:"12px" }}
              onClick={() => setCurrentStep('estimateDetails')}
            >
              Estimate Details
            </p>
            <p
              style={{ cursor: 'pointer', fontWeight: currentStep === 'quoteDetails' ? 'bold' : 'normal' ,fontSize:"12px"}}
              onClick={() => setCurrentStep('quoteDetails')}
            >
              Quote Details
            </p>
          </div>
          <hr></hr>
  
          {currentStep === 'basicDetails' && (
            <BasicDetails formData={formData} onFormDataChange={handleFormDataChange} onNextStep={handleNextStep} />
          )}
          {currentStep === 'estimateDetails' && (
            <EstimateDetails formData={formData} onFormDataChange={handleFormDataChange} onNextStep={handleNextStep} onBackToBasicDetails={() => setCurrentStep('basicDetails')} />
          )}
          {currentStep === 'quoteDetails' && (
            <QuoteDetails formData={formData} onFormDataChange={handleFormDataChange} onCreateEstimate={handleCreateEstimate} onBackToEstimateDetails={() => setCurrentStep('estimateDetails')} />
          )}
        </div>
      </div>
    );
  }
  
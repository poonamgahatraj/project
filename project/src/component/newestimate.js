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
      sales_person: '',
      department_name: '',
      contact_name: '',
      address: '',
      estimate_title: '',
      customer_order_number: '',
      estimated_date: '',
      valid_days: '',
    });
  
    const [currentStep, setCurrentStep] = useState('basicDetails');
  
    const handleFormDataChange = (field, value) => {
      setFormData({
        ...formData,
        [field]: value,
      });
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
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
         
          position: 'relative',
        }}
      >
        <p>Estimates</p>
        <p>Manage the estimate information</p>

        <div
          style={{
            width: '35%',
            padding: '10px',
            backgroundColor: 'white', // Ensure this is opaque for the content
            border: '1px solid black',
            position: 'absolute',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            right:"0",
           top:"0",
            height:"100%",
            boxSizing:"border-box"
          }}
        >
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <p>Add Estimate</p>
            <button onClick={handleClose}>x</button>
            </div>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <p
              style={{ cursor: 'pointer', fontWeight: currentStep === 'basicDetails' ? 'bold' : 'normal' }}
              onClick={() => setCurrentStep('basicDetails')}
            >
              Basic Details
            </p>
            <p
              style={{ cursor: 'pointer', fontWeight: currentStep === 'estimateDetails' ? 'bold' : 'normal' }}
              onClick={() => setCurrentStep('estimateDetails')}
            >
              Estimate Details
            </p>
            <p
              style={{ cursor: 'pointer', fontWeight: currentStep === 'quoteDetails' ? 'bold' : 'normal' }}
              onClick={() => setCurrentStep('quoteDetails')}
            >
              Quote Details
            </p>
          </div>
  
          {currentStep === 'basicDetails' && (
            <BasicDetails formData={formData} onFormDataChange={handleFormDataChange} onNextStep={handleNextStep} />
          )}
          {currentStep === 'estimateDetails' && (
            <EstimateDetails formData={formData} onFormDataChange={handleFormDataChange} onNextStep={handleNextStep} />
          )}
          {currentStep === 'quoteDetails' && (
            <QuoteDetails formData={formData} onFormDataChange={handleFormDataChange} onCreateEstimate={handleCreateEstimate} />
          )}
        </div>
      </div>
    );
  }
  
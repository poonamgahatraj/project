import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BasicDetails from './basicdetails';
import EstimateDetails from './estimatedetails';
import QuoteDetails from './quotedetails';

export default function NewEstimate() {
    const navigate = useNavigate(); 
    const [basicDetails, setBasicDetails] = useState({
      client: '',
      department: '',
      contact: '',
      salesperson: '',
      address: '',
    });

    const [estimateDetails, setEstimateDetails] = useState({
      estimateTitle: '',
      orderNumber: '',
      date: '',
      validity: '',
    });

    const [quoteDetails, setQuoteDetails] = useState({
      quoteDescription: '',
      additionalNotes: '',
    });

    const handleCreateEstimate = async () => {
      const data = { ...basicDetails, ...estimateDetails, ...quoteDetails };
  
      try {
        const response = await axios.post('http://localhost:3001/api/create-estimate', data);
        console.log('Response from server:', response.data);
      } catch (error) {
        console.error('Request error:', error.message); // Log error message
        console.error('Error details:', error.response || error); // Log detailed error
      }
    };
    const [currentStep, setCurrentStep] = useState('basicDetails');
  
   
  
    const handlenextstep =()=>{
      if (currentStep === 'basicDetails') {
        setCurrentStep('estimateDetails');
      } else if (currentStep === 'estimateDetails') {
        setCurrentStep('quoteDetails');
      } 
    }
  
   

    const handleClose = () => {
        navigate('/'); // Navigate to the home route
      };

      const getSelectedStyle = (step) => {
    return currentStep === step ? { fontWeight: 'bold', borderBottom: '2px solid #d15b2c' } : {};
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
            backgroundColor: '#FDFBFB', // Ensure this is opaque for the content
           
            position: 'absolute',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            right:"0",
           top:"0",
            height:"100%",
            boxSizing:"border-box",border:"1px solid #E0DFDF"
          }}
        >
            <div style={{display:"flex",justifyContent:"space-between",alignItems:'center'}}>
            <p style={{fontSize:"14px",fontWeight:"bold"}}>Add Estimate</p>
            <button onClick={handleClose} style={{border:"1px solid #E0DFDF",height:"30px",width:"30px", borderRadius:"50px"}}>x</button>
            </div>
            <hr style={{margin:"15px 0px"}}></hr>
          
          <div style={{ display: 'flex', gap: '25px' }}>
            <p
              style={{ cursor: 'pointer',margin:"0",paddingBottom:"15px", fontWeight: currentStep === 'basicDetails' ? '500' : '500' ,fontSize:"12px" ,...getSelectedStyle('basicDetails')}}
              onClick={() => setCurrentStep('basicDetails')}
            >
              Basic Details
            </p>
            <p
              style={{ cursor: 'pointer',margin:"0",paddingBottom:"15px", fontWeight: currentStep === 'estimateDetails' ? '500' : '500',fontSize:"12px",...getSelectedStyle('estimateDetails') }}
              onClick={() => setCurrentStep('estimateDetails')}
            >
              Estimate Details
            </p>
            <p
              style={{ cursor: 'pointer',margin:"0",paddingBottom:"15px", fontWeight: currentStep === 'quoteDetails' ? '500' : '500' ,fontSize:"12px",...getSelectedStyle('quoteDetails')}}
              onClick={() => setCurrentStep('quoteDetails')}
            >
              Quote Details
            </p>
          </div>
          <hr style={{margin:"0"}}></hr>
  
          {currentStep === 'basicDetails' && (
            <BasicDetails  handlenextstep={handlenextstep}  />
          )}
          {currentStep === 'estimateDetails' && (
            <EstimateDetails details={estimateDetails} setDetails={setEstimateDetails} onBack={() => setCurrentStep('basicDetails')} handlenextstep={handlenextstep}  />
          )}
          {currentStep === 'quoteDetails' && (
            <QuoteDetails details={quoteDetails} setDetails={setQuoteDetails} onCreate={handleCreateEstimate} onBack={() => setCurrentStep('estimateDetails')}/>
          )}
        </div>
      </div>
    );
  }
  
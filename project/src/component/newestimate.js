import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BasicDetails from './basicdetails';
import EstimateDetails from './estimatedetails';
import QuoteDetails from './quotedetails';
import Headers from './headers';
import Sidenav from './sidenav';

export default function NewEstimate() {
  const navigate = useNavigate();

  const [basicDetails, setBasicDetails] = useState({
    client_name: '',
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

  const [currentStep, setCurrentStep] = useState('BasicDetails');
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleCreateEstimate = async () => {
    const data = { ...basicDetails, ...estimateDetails, ...quoteDetails };
    console.log('Payload:', data); 
  
    try {
      const response = await axios.post('http://localhost:3001/api/create-estimate',data, {
        headers: {
          'Content-Type': 'application/json'
        }
      } );
      console.log('Response from server:', response.data);
      // Handle success
    } catch (error) {
      console.error('Request error:', error.message);
  
      // Check if the error has a response property (i.e., server-side error)
      if (error.response) {
        console.error('Error response:', error.response);
        // Try to extract the error message from the response
        const errorMessage = error.response.data?.error || error.response.statusText || 'Unknown server error';
        alert(`An error occurred while creating the estimate: ${errorMessage}`);
      } else if (error.request) {
        // If no response was received, it could be a network error
        console.error('Error request:', error.request);
        alert('No response received from the server. Please check your network connection.');
      } else {
        // For other types of errors
        console.error('Error details:', error);
        alert(`An error occurred: ${error.message || 'Unknown error'}`);
      }
    }
  };
  
  

  const handleNextStep = () => {
    if (currentStep === 'BasicDetails') {
      setCurrentStep('EstimateDetails');
      setCompletedSteps((prevSteps) => [...prevSteps, 'BasicDetails']);
    } else if (currentStep === 'EstimateDetails') {
      setCurrentStep('QuoteDetails');
      setCompletedSteps((prevSteps) => [...prevSteps, 'EstimateDetails']);
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  const getStepStyle = (step) => ({
    circle: {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      backgroundColor: completedSteps.includes(step) ? '#FDFBFB' : 'white',
      color:step === 'BasicDetails' && currentStep === 'BasicDetails'?"#D15B2C": completedSteps.includes(step) ? '#D15B2C' : '#2F2F2F',
      fontWeight: currentStep === step ? 'bold' : completedSteps.includes(step) ? 'bold' : 'bold', // Bold for active step
      border: currentStep === step // Step 1 and it's active
      ? '0.2px solid #D15B2C': completedSteps.includes(step)
        ? '0.2px solid #D15B2C' // Orange border for completed step
        : '0.2px solid #636363', // Default gray border
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
    },
    text: {
      marginLeft: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: completedSteps.includes(step) ? '#2F2F2F' : '#2F2F2F', // Consistent color for text
    },
    container: {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
     
      borderBottom: currentStep === step ? '2px solid #D15B2C' : 'none',
      height:"60px",
    
    },
  });
  
  return (

    <div style={{width:"100vw",height:"100vh",boxSizing:"border-box",overflow:"hidden",position: 'relative',backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>

        
<Headers/>
<div style={{display:"flex",overflow:"hidden"}}>
<Sidenav/>
    <div style={{width: '95%',height: '100vh',padding: "0% 5%" ,boxSizing: 'border-box', border:"2px solid #E0DFDF"}} >
    <div>
                        <p style={{fontSize:"22px",fontWeight:"500"}}>Estimates</p>
                        <p style={{fontSize:"18px"}}>Manage the estimate information</p>
                    </div>

      <div
        style={{
          width: '35%',
         height:"100vh",
          backgroundColor: 'white',
          position: 'absolute',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          right: '0',
          top: '0',
          height: '100%',
          boxSizing: 'border-box',
          border: '1px solid #E0DFDF',
          
         
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding:"10px 20px" ,backgroundColor:"white"}}>
          <p style={{ fontSize: '16px', fontWeight: '500',margin:'10px 0px' }}>Add Estimate</p>
          <button
            onClick={handleClose}
            style={{
              border: '1px solid #E0DFDF',
              height: '35px',
              width: '35px',
              borderRadius: '50%',
              cursor: 'pointer',
              backgroundColor:"white"
            }}
          >
            X
          </button>
        </div>
        <div style={{width:"100%",border:"0.5px solid #E0DFDF"}}></div>

        {/* Step Bar */}
        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' ,padding:"0px 20px",height:"60px"}}>
          {['BasicDetails', 'EstimateDetails', 'QuoteDetails'].map((step, index) => {
            const stepStyle = getStepStyle(step);
            return (
              <div
                key={step}
                style={stepStyle.container}
                onClick={() => setCurrentStep(step)}
              
              >
                <div style={stepStyle.circle}>
                  {completedSteps.includes(step) ? (
                    <img src='./images/tick.png' style={{height:"17px",width:"17px"}}></img> // Orange colored tick
                  ) : (
                    (index + 1).toString().padStart(2, '0')
                  )}
                </div>
                <p style={stepStyle.text}>
                  {step.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </div>
            );
          })}
        </div>
        <div style={{width:"100%",border:"0.5px solid #E0DFDF"}}></div>

        {/* Step Content */}
        {currentStep === 'BasicDetails' && (
          <BasicDetails handlenextstep={handleNextStep} details={basicDetails} setBasicDetails={setBasicDetails} />
        )}
        {currentStep === 'EstimateDetails' && (
          <EstimateDetails
            details={estimateDetails}
            setDetails={setEstimateDetails}
            onBack={() => setCurrentStep('BasicDetails')}
            handlenextstep={handleNextStep}
          />
        )}
        {currentStep === 'QuoteDetails' && (
          <QuoteDetails details={quoteDetails} setDetails={setQuoteDetails} onCreate={handleCreateEstimate} onBack={() => setCurrentStep('EstimateDetails')} />
        )}
      </div>
    </div>
    </div>
    </div>
  );
}

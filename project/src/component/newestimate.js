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

  const [currentStep, setCurrentStep] = useState('BasicDetails');
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleCreateEstimate = async () => {
    const data = { ...basicDetails, ...estimateDetails, ...quoteDetails };

    try {
      const response = await axios.post('http://localhost:3001/api/create-estimate', data);
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Request error:', error.message);
      console.error('Error details:', error.response || error);
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
      backgroundColor: currentStep === step || completedSteps.includes(step) ? '#FDFBFB' : '#4343430D',
      color: currentStep === step || completedSteps.includes(step) ? '#D15B2C' : '#2F2F2F',
      border: currentStep === step || completedSteps.includes(step)
        ? '0.2px solid #D15B2C' // Orange border for active or completed step
        : '0.2px solid #636363', // Default gray border
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
    },
    text: {
      marginLeft: '8px',
      fontSize: '14px',
      fontWeight: currentStep === step ? '500' : '500',
      color: currentStep === step || completedSteps.includes(step) ? '#2F2F2F' : '#2F2F2F', // Orange text for active or completed step
    },
    container: {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottom: currentStep === step ? '2px solid #D15B2C' : 'none',
    },
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: '5%',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Estimates</p>
      <p>Manage the estimate information</p>

      <div
        style={{
          width: '35%',
         height:"100vh",
          backgroundColor: '#FDFBFB',
          position: 'absolute',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          right: '0',
          top: '0',
          height: '100%',
          boxSizing: 'border-box',
          border: '1px solid #E0DFDF',
          
         
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding:"0px 20px" }}>
          <p style={{ fontSize: '16px', fontWeight: '500',margin:'10px 0px' }}>Add Estimate</p>
          <button
            onClick={handleClose}
            style={{
              border: '1px solid #E0DFDF',
              height: '25px',
              width: '25px',
              borderRadius: '50%',
              cursor: 'pointer',
              backgroundColor:"white"
            }}
          >
            x
          </button>
        </div>
        <hr style={{ margin: '0px 0px' }} />

        {/* Step Bar */}
        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' ,padding:"0px 20px"}}>
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
                    <span style={{ color: '#D15B2C' }}>✓</span> // Orange colored tick
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
        <hr style={{ margin: '0' }} />

        {/* Step Content */}
        {currentStep === 'BasicDetails' && (
          <BasicDetails handlenextstep={handleNextStep} />
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
          <QuoteDetails
            details={quoteDetails}
            setDetails={setQuoteDetails}
            onCreate={handleCreateEstimate}
            onBack={() => setCurrentStep('EstimateDetails')}
          />
        )}
      </div>
    </div>
  );
}

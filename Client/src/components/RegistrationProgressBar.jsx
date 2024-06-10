import React from 'react';
import '../css/ProgressBar.css';

const ProgressBar = ({ currentStep, setCurrentStep }) => {
  return (
    <div className="progress-bar">
      {[1, 2, 3].map(step => (
        <div onClick={() => setCurrentStep(step)} key={step} className={`circle ${currentStep >= step ? 'active' : ''}`} >
          {step}
        </div>
      ))}
      <div className="line"></div>
    </div>
  );
};

export default ProgressBar;

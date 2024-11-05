// LegalSettings.js
import React, { useState } from 'react';
import '../styles/Settings.css';

const LegalSettings = () => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAgreed) {
      // Handle the submission logic here
      alert('You have agreed to the Terms and Conditions.');
    } else {
      alert('You must agree to the Terms and Conditions to proceed.');
    }
  };

  return (
    <div className="settings-container">
      <h2>Legal Settings</h2>
      <div className="setting-item">
        <p>
          Please review our <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.
        </p>
      </div>
      <div className="setting-item">
        <label>
          <input 
            type="checkbox" 
            checked={isAgreed} 
            onChange={handleCheckboxChange} 
          />
          I agree to the Terms and Conditions
        </label>
      </div>
      <div className="setting-item">
        <button onClick={handleSubmit} className="btn-submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default LegalSettings;
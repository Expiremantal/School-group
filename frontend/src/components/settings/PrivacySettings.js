// PrivacySettings.js
import React from 'react';
import '../styles/Settings.css';

const PrivacySettings = () => {
  return (
    <div className="settings-container">
      <h2>Privacy Settings</h2>
      <div className="setting-item">
        <label>
          <input type="checkbox" />
          Allow Search Engines to Index My Profile
        </label>
      </div>
      <div className="setting-item">
        <label>
          <input type="checkbox" />
          Share My Data with Third-Party Services
        </label>
      </div>
      <div className="setting-item">
        <label>
          <input type="checkbox" />
          Show My Online Status
        </label>
      </div>
    </div>
  );
};

export default PrivacySettings;

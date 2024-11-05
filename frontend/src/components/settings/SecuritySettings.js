// SecuritySettings.js
import React from 'react';
import '../styles/Settings.css';

const SecuritySettings = () => {
  return (
    <div className="settings-container">
      <h2>Security Settings</h2>
      <div className="setting-item">
        <label>
          Change Password:
          <input type="password" placeholder="New Password" />
        </label>
      </div>
      <div className="setting-item">
        <label>
          Two-Factor Authentication:
          <select>
            <option value="disabled">Disabled</option>
            <option value="enabled">Enabled</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default SecuritySettings;

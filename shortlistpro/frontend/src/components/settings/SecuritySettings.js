import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Settings.css';

const SecuritySettings = () => {
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [twoFactorAuth, setTwoFactorAuth] = useState('disabled');

  const handleChangePassword = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/settings/${localStorage.getItem('userId')}/change-password`, 
        { oldPassword, newPassword }
      );
      alert('Password updated successfully');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to update password');
    }
  };

  const handleTwoFactorAuthChange = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/settings/${localStorage.getItem('userId')}`, 
        { security: { twoFactorAuthEnabled: twoFactorAuth === 'enabled' } }
      );
      alert('Two-factor authentication status updated');
    } catch (error) {
      console.error('Error updating two-factor authentication:', error);
      alert('Failed to update two-factor authentication');
    }
  };

  return (
    <div className="settings-container">
      <h2>Security Settings</h2>
      <div className="setting-item">
        <label>
          Change Password:
          <input
            type="password"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </label>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
      <div className="setting-item">
        <label>
          Two-Factor Authentication:
          <select
            value={twoFactorAuth}
            onChange={(e) => setTwoFactorAuth(e.target.value)}
          >
            <option value="disabled">Disabled</option>
            <option value="enabled">Enabled</option>
          </select>
        </label>
        <button onClick={handleTwoFactorAuthChange}>Save Settings</button>
      </div>
    </div>
  );
};

export default SecuritySettings;

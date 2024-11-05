// NotificationSettings.js
import React from 'react';
import '../styles/Settings.css';

const NotificationSettings = () => {
  return (
    <div className="settings-container">
      <h2>Notification Settings</h2>
      <div className="setting-item">
        <label>
          <input type="checkbox" />
          Email Notifications
        </label>
      </div>
      <div className="setting-item">
        <label>
          <input type="checkbox" />
          SMS Notifications
        </label>
      </div>
      <div className="setting-item">
        <label>
          <input type="checkbox" />
          Push Notifications
        </label>
      </div>
    </div>
  );
};

export default NotificationSettings;

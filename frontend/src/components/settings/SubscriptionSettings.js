// SubscriptionSettings.js
import React, { useState } from 'react';
import '../styles/Settings.css';

const SubscriptionSettings = () => {
  const [autoRenewal, setAutoRenewal] = useState('enabled');
  const [subscriptionLevel, setSubscriptionLevel] = useState('Premium');

  const handleAutoRenewalChange = (e) => {
    setAutoRenewal(e.target.value);
    alert(`Auto-Renewal has been ${e.target.value === 'enabled' ? 'enabled' : 'disabled'}.`);
  };

  const handleSubscriptionChange = (e) => {
    setSubscriptionLevel(e.target.value);
    alert(`You have switched to the ${e.target.value} subscription.`);
  };

  const handleManageSubscription = () => {
    // Logic to manage subscription, e.g., redirect to a subscription management page
    alert('Redirecting to manage subscription...');
    // You can use history.push('/manage-subscription') if using react-router
  };

  return (
    <div className="settings-container">
      <h2>Subscription Settings</h2>
      <div className="setting-item">
        <p>Your current subscription: <strong>{subscriptionLevel}</strong></p>
        <button className="manage-btn" onClick={handleManageSubscription}>
          Manage Subscription
        </button>
      </div>
      <div className="setting-item">
        <label>
          Auto-Renewal:
          <select value={autoRenewal} onChange={handleAutoRenewalChange}>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </label>
      </div>
      <div className="setting-item">
        <label>
          Subscription Level:
          <select value={subscriptionLevel} onChange={handleSubscriptionChange}>
            <option value="Free">Free - Post jobs and see jobs</option>
            <option value="Basic">Basic - Post jobs, see jobs, and access basic analytics</option>
            <option value="Premium">Premium - All features including advanced analytics and priority support</option>
          </select>
        </label>
      </div>
      <div className="setting-description">
        <h3>Subscription Levels:</h3>
        <ul>
          <li><strong>Free:</strong> Post jobs and see jobs.</li>
          <li><strong>Basic:</strong> Post jobs, see jobs, and access basic analytics.</li>
          <li><strong>Premium:</strong> All features including advanced analytics and priority support.</li>
        </ul>
      </div>
    </div>
  );
};

export default SubscriptionSettings;
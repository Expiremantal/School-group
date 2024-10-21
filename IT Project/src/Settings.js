import React, { useState, useEffect } from 'react';
import './Settings.css';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('account');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    useEffect(() => {
        setActiveTab('account'); // Show the first tab by default
    }, []);

    return (
        <div className="settings-container">
            <h1>Settings</h1>
            <div className="tabs">
                {['account', 'privacy', 'notifications', 'display', 'security', 'subscription', 'support', 'legal'].map((tab) => (
                    <button
                        key={tab}
                        className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')} Settings
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'account' && <AccountSettings />}
            {activeTab === 'privacy' && <PrivacySettings />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'display' && <DisplaySettings />}
            {activeTab === 'security' && <SecuritySettings />}
            {activeTab === 'subscription' && <SubscriptionSettings />}
            {activeTab === 'support' && <SupportSettings />}
            {activeTab === 'legal' && <LegalSettings />}
        </div>
    );
};

// Account Settings Component
const AccountSettings = () => (
    <div className="tab-content">
        <h2>Account Settings</h2>
        <form>
            {/* Form Fields */}
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name" /><br />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Enter your email" /><br />
            <label htmlFor="profile-pic">Profile Picture:</label>
            <input type="file" id="profile-pic" /><br />
            <label htmlFor="password">Change Password:</label>
            <input type="password" id="password" placeholder="Enter new password" /><br />
            <label htmlFor="2fa">Enable Two-Factor Authentication:</label>
            <input type="checkbox" id="2fa" /><br />
            <button type="submit">Save Account Settings</button>
        </form>
    </div>
);

// Privacy Settings Component
const PrivacySettings = () => (
    <div className="tab-content">
        <h2>Privacy Settings</h2>
        <form>
            {/* Form Fields */}
            <label htmlFor="data-sharing">Data Sharing Preferences:</label>
            <select id="data-sharing">
                <option value="all">Share with all</option>
                <option value="partners">Share only with partners</option>
                <option value="none">Do not share</option>
            </select><br />
            <label htmlFor="activity-visibility">Activity Visibility:</label>
            <select id="activity-visibility">
                <option value="everyone">Everyone</option>
                <option value="friends">Friends only</option>
                <option value="none">No one</option>
            </select><br />
            <label htmlFor="ad-preferences">Ad Preferences:</label>
            <input type="checkbox" id="ad-preferences" /> Personalize ads<br />
            <button type="submit">Save Privacy Settings</button>
        </form>
    </div>
);

// Notification Settings Component
const NotificationSettings = () => (
    <div className="tab-content">
        <h2>Notification Settings</h2>
        <form>
            <label>Email Notifications:</label><br />
            <input type="checkbox" id="email-notifications" defaultChecked /> Receive email alerts<br />
            <label>Push Notifications:</label><br />
            <input type="checkbox" id="push-notifications" /> Receive push notifications<br />
            <label>In-App Notifications:</label><br />
            <input type="checkbox" id="inapp-notifications" defaultChecked /> Receive in-app alerts<br />
            <button type="submit">Save Notification Settings</button>
        </form>
    </div>
);

// Display Settings Component
const DisplaySettings = () => (
    <div className="tab-content">
        <h2>Display Settings</h2>
        <form>
            <label htmlFor="theme">Theme:</label>
            <select id="theme">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="custom">Custom</option>
            </select><br />
            <label htmlFor="language">Language:</label>
            <select id="language">
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
            </select><br />
            <label htmlFor="font-size">Font Size:</label>
            <input type="number" id="font-size" min="12" max="36" defaultValue="16" /><br />
            <button type="submit">Save Display Settings</button>
        </form>
    </div>
);

// Security Settings Component
const SecuritySettings = () => (
    <div className="tab-content">
        <h2>Security Settings</h2>
        <form>
            <label htmlFor="login-history">Login History:</label>
            <ul id="login-history">
                <li>Last login: 2024-10-16 - Device: Windows 10</li>
                <li>Last login: 2024-10-15 - Device: iPhone 13</li>
            </ul>
            <label htmlFor="connected-devices">Connected Devices:</label>
            <ul id="connected-devices">
                <li>iPhone 13 - Last active: 2024-10-16</li>
                <li>Windows 10 - Last active: 2024-10-15</li>
            </ul>
            <label htmlFor="security-questions">Security Questions:</label>
            <select id="security-questions">
                <option value="pet">What is your first pet's name?</option>
                <option value="school">What is the name of your first school?</option>
            </select><br />
            <input type="text" id="security-answer" placeholder="Enter answer" /><br />
            <button type="submit">Save Security Settings</button>
        </form>
    </div>
);

// Subscription Settings Component
const SubscriptionSettings = () => (
    <div className="tab-content">
        <h2>Subscription Settings</h2>
        <form>
            <label htmlFor="plan-details">Current Plan:</label>
            <p id="plan-details">Pro Plan - $9.99/month</p>
            <label htmlFor="billing-info">Billing Information:</label>
            <input type="text" id="billing-info" placeholder="Update billing information" /><br />
            <label htmlFor="usage-stats">Usage Statistics:</label>
            <p id="usage-stats">You have used 50GB out of 100GB.</p>
            <button type="submit">Save Subscription Settings</button>
        </form>
    </div>
);

// Support Settings Component
const SupportSettings = () => (
    <div className="tab-content">
        <h2>Support and Feedback</h2>
        <form>
            <label htmlFor="help-center">Help Center:</label>
            <a href="/help-center" id="help-center">Visit Help Center</a><br />
            <label htmlFor="contact-support">Contact Support:</label>
            <textarea id="contact-support" placeholder="Describe your issue"></textarea><br />
            <label htmlFor="feedback">Submit Feedback:</label>
            <textarea id="feedback" placeholder="Submit feedback or report an issue"></textarea><br />
            <button type="submit">Submit Feedback</button>
        </form>
    </div>
);

// Legal Settings Component
const LegalSettings = () => (
    <div className="tab-content">
        <h2>Legal and Compliance</h2>
        <form>
            <label htmlFor="tos">Terms of Service:</label>
            <a href="/terms" id="tos">View Terms of Service</a><br />
        </form>
    </div>
);

export default Settings;

import React, { useState, useEffect } from 'react';
import './styles/Settings.css'; // Ensure correct path
import AccountSettings from './settings/AccountSettings';
import PrivacySettings from './settings/PrivacySettings';
import NotificationSettings from './settings/NotificationSettings';
import DisplaySettings from './settings/DisplaySettings';
import SecuritySettings from './settings/SecuritySettings';
import SubscriptionSettings from './settings/SubscriptionSettings';
import SupportSettings from './settings/SupportSettings';
import LegalSettings from './settings/LegalSettings';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('account');
    const [theme, setTheme] = useState('light');
    const [fontSize, setFontSize] = useState(16);

    useEffect(() => {
        fetch('/api/user-settings')
            .then((res) => res.json())
            .then((data) => {
                setTheme(data.theme);
                setFontSize(data.fontSize);
            });

        setActiveTab('account');
    }, []);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className={`settings-container settings-theme-${theme}`} style={{ fontSize: `${fontSize}px` }}>
            <h1>Settings</h1>
            <div className="settings-tabs">
                {['account', 'privacy', 'notifications', 'display', 'security', 'subscription', 'support', 'legal'].map((tab) => (
                    <button
                        key={tab}
                        className={`settings-tab-button ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)} Settings
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'account' && <AccountSettings />}
            {activeTab === 'privacy' && <PrivacySettings />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'display' && (
                <DisplaySettings 
                    theme={theme} 
                    onThemeChange={(e) => setTheme(e.target.value)} 
                    fontSize={fontSize} 
                    onFontSizeChange={(e) => setFontSize(e.target.value)} 
                />
            )}
            {activeTab === 'security' && <SecuritySettings />}
            {activeTab === 'subscription' && <SubscriptionSettings />}
            {activeTab === 'support' && <SupportSettings />}
            {activeTab === 'legal' && <LegalSettings />}
        </div>
    );
};

export default Settings;
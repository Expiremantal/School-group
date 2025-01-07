import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Settings.css';

const DisplaySettings = ({ theme, onThemeChange, fontSize, onFontSizeChange }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [currentFontSize, setCurrentFontSize] = useState(fontSize);

  const handleSaveSettings = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/settings/${localStorage.getItem('userId')}`, // Assuming userId is stored in localStorage
        { theme: currentTheme, fontSize: currentFontSize }
      );
      alert('Settings updated successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    }
  };

  useEffect(() => {
    setCurrentTheme(theme);
    setCurrentFontSize(fontSize);
  }, [theme, fontSize]);

  return (
    <div className="settings-container">
      <h2>Display Settings</h2>
      <div className="setting-item">
        <label htmlFor="theme-select">
          Theme:
          <select
            id="theme-select"
            value={currentTheme}
            onChange={(e) => setCurrentTheme(e.target.value)}
            className="styled-select"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
          </select>
        </label>
      </div>
      <div className="setting-item">
        <label htmlFor="font-size">
          Font Size:
          <input
            id="font-size"
            type="range"
            min="12"
            max="24"
            value={currentFontSize}
            onChange={(e) => setCurrentFontSize(e.target.value)}
            className="font-size-slider"
          />
          <span className="font-size-value">{currentFontSize}px</span>
        </label>
      </div>
      <button onClick={handleSaveSettings}>Save Settings</button>
    </div>
  );
};

export default DisplaySettings;

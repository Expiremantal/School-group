// DisplaySettings.js
import React from 'react';
import '../styles/Settings.css';

const DisplaySettings = ({ theme, onThemeChange, fontSize, onFontSizeChange }) => {
  return (
    <div className="settings-container">
      <h2>Display Settings</h2>
      <div className="setting-item">
        <label htmlFor="theme-select">
          Theme:
          <select id="theme-select" value={theme} onChange={onThemeChange} className="styled-select">
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
            value={fontSize} 
            onChange={onFontSizeChange} 
            className="font-size-slider"
          />
          <span className="font-size-value">{fontSize}px</span>
        </label>
      </div>
    </div>
  );
};

export default DisplaySettings;
import React from 'react';
import '../styles/Loader.css';

const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p>Loading your dashboard...</p>
    </div>
  );
};

export default Loader;

import React from 'react';

const Applications = () => {
  return (
    <div className="applications">
      <h2>Applications</h2>
      <div className="applications-list">
        <div className="application-category">
          <h3>Design</h3>
          <div className="status-block">
            <p>Received: 05</p>
            <p>On hold: 01</p>
            <p>Rejected: 03</p>
          </div>
        </div>
        <div className="application-category">
          <h3>React JS</h3>
          <div className="status-block">
            <p>Received: 25</p>
            <p>On hold: 03</p>
            <p>Rejected: 06</p>
          </div>
        </div>
      </div>
      <a href="#" className="view-all-link">View all</a>
    </div>
  );
};

export default Applications;

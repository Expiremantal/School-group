// src/components/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/Sidebar.css';

function Sidebar() {
  const location = useLocation();
  
  return (
    <div className="sidebar">
    
      <div className="user-profile">
        <img src="path/to/user-image.jpg" alt="User Profile" />
        <div className="user-info">
          <h4>Username</h4>
          <p>HR Manager</p>
        </div>
      </div>

      <ul>
        <li>

          
          <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>

        <li>
          <Link to="/candidates" className={`nav-link ${location.pathname === '/candidates' ? 'active' : ''}`}>
            <i className="fas fa-users"></i> Candidates
          </Link>
        </li>
        <li>
          <Link to="/candidate-pipeline" className={`nav-link ${location.pathname === '/candidate-pipeline' ? 'active' : ''}`}>
            <i className="fas fa-chart-line"></i> Candidate Pipeline
          </Link>
        </li>
        <li>
          <Link to="/resumes" className={`nav-link ${location.pathname === '/resumes' ? 'active' : ''}`}>
            <i className="fas fa-file-alt"></i> Resumes
          </Link>
        </li>
        
        <li>
          <Link to="/talent-pool" className={`nav-link ${location.pathname === '/talent-pool' ? 'active' : ''}`}>
            <i className="fas fa-user-tie"></i> Talent Pool
          </Link>
        </li>

        <li>
          <Link to="/jobs" className={`nav-link ${location.pathname === '/jobs' ? 'active' : ''}`}>
            <i className="fas fa-briefcase"></i> Jobs
          </Link>
        </li>

        <li>
          <Link to="/settings" className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}>
            <i className="fas fa-cogs"></i> Settings
          </Link>
        </li>
        
      </ul>

      <div className="logout-container">
        <Link to="/logout" className="logout">
          <i className="fas fa-sign-out-alt"></i> Log out
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;

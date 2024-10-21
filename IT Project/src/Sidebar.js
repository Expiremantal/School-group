// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Styling file

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/dashboard" className="nav-link"><i className="fas fa-tachometer-alt"></i> Dashboard</Link></li>
        <li><Link to="/applicants" className="nav-link"><i className="fas fa-user-alt"></i> Applicants</Link></li>
        <li><Link to="/candidate" className="nav-link"><i className="fas fa-user-alt"></i> Candidate</Link></li>
        <li><Link to="/candidate-pipeline" className="nav-link"><i className="fas fa-clipboard"></i> Candidate Pipeline</Link></li>
        <li><Link to="/resumes" className="nav-link"><i className="fas fa-file"></i> Resumes</Link></li>
        <li><Link to="/talent-pool" className="nav-link"><i className="fas fa-briefcase"></i> Talent Pool</Link></li>
        <li><Link to="/job-posting" className="nav-link"><i className="fas fa-clipboard-list"></i> Job Posting</Link></li>
        <li><Link to="/settings" className="nav-link"><i className="fas fa-cog"></i> Settings</Link></li>

        <li><Link to="/logout" className="nav-link"><i className="fas fa-cog"></i> Logout</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;

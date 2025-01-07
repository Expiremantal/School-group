// src/components/Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSearch, FaListAlt, FaUser, FaBuilding, FaChartBar, FaSignOutAlt } from 'react-icons/fa'; 
import './styles/Sidebar.css';

function Sidebar() {
  
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear any stored authentication tokens or user data (e.g., localStorage)
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    alert("Logged out successfully!");
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <aside className="sidebar"> 
    
         <div className="logo-container">
            <div className="logo-text">
                <h1>Shortlist<span>Pro</span></h1>
            </div>
        </div>

        <nav>
        <ul>
          <li><Link to="/"><FaHome className="icon" /> Dashboard</Link></li>
          <li><Link to="/user"><FaSearch className="icon" /> User Management</Link></li>
          <li><Link to="/candidates"><FaListAlt className="icon" /> Candidates</Link></li>
          <li><Link to="/candidate-pipeline"><FaUser className="icon" /> Candidate Pipeline</Link></li>
          <li><Link to="/resumes"><FaBuilding className="icon" />Resumes</Link></li>
          <li><Link to="/talent-pool"><FaChartBar className="icon" /> Talent Pool</Link></li>
          <li><Link to="/jobs"><FaBuilding className="icon" /> Jobs</Link></li>
          <li><Link to="/settings"><FaChartBar className="icon" /> Settings</Link></li>
        </ul>
      </nav>
      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        <FaSignOutAlt className="icon" /> Logout
      </button>
      
    
    </aside>
  );
}

export default Sidebar;

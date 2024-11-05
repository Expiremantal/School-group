import React from 'react';
import Sidebar from './Sidebar';
import PieChart from './pieChart'; // Import the new PieChart component
import Applications from './Applications';
import JobStats from './JobStats';
import CircularBarGraph from './CircularBarGraph';
import Interviews from './Interviews';
import Calendar from './Calendar';
import './styles/Dashboard.css';
import { FiBell } from 'react-icons/fi';
import { Link } from 'react-router-dom';


const Dashboard = () => {
  
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard">
        <div className="main-content">
          {/* Dashboard Header */}
          <header className="dashboard-header">
            <h1>Good Morning, {user?.fullname}!</h1>
            <div className="header-right">
              <input type="text" placeholder="Search..." className="search-bar" />
              <button className="btn-post-job">
                <Link to="/post-job">
                  Post a Job
                </Link>
              </button>
              <FiBell className="notification-icon" />
              <img src="/path/to/user-image.jpg" alt="User" className="user-image" />
            </div>
          </header>

          {/* Stats Section */}
          <div className="stats-container">
          <PieChart title="Interviews" />
            <PieChart title="Shortlisted" value={20} percentage={5} />
            <PieChart title="Hired" value={6} percentage={5} />
          </div>

          {/* Main Content Sections */}
          <div className="content-container">
            {/* Left Section */}
            <div className="left-section">
              <div className="applications-container">
                <Applications />
                <a href="#" className="view-all-link">View all</a>
              </div>
              <div className="job-status">
                <JobStats />
              </div>
              <div className="circular-bar-graph">
                <CircularBarGraph />
              </div>
            </div>

            {/* Right Section */}
            <div className="right-section">
              <div className="interviews-container">
                <Interviews />
              
              </div>
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

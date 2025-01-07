import React from 'react';

import PieChart from './pieChart'; // Import the new PieChart component
import Applications from './Applications';
import JobStats from './JobStats';

import Interviews from './Interviews';
import Calendar from './Calendar';
import './styles/Dashboard.css';
import { FiBell } from 'react-icons/fi';
import { Link } from 'react-router-dom';


const Dashboard = () => {
  
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);
  

  return (
    <div className="dashboard-container">
     
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
              
            </div>
          </header>

          {/* Stats Section */}
          <div className="stats-container">
            <PieChart title="Under consideration" value={20} percentage={5} />
          <PieChart title="Interviews" />
            
            <PieChart title="Rejected" value={6} percentage={5} />
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

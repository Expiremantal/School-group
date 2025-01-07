import React from 'react';
import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import JobPosting from './components/JobPosting.js';
import CandidatePipeline from './components/CandidatePipeline';
import Resumes from './components/Resumes';
import Candidates from './components/Candidates';
import Jobs from './components/JobList';
import Settings from './components/Settings';
import TalentPool from './components/TalentPool';
import Login from './components/auth/Login';
import UserManagement from './components/UserManagement';
import ChangePasswordPage from './components/auth/ForgotPasswordPage.js';
import './components/styles/App.css';


function App() {

  return (
    <Router>
      <MainContent />
    </Router>
  );
}


function MainContent() {
  const location = useLocation(); // Get the current route

  const shouldShowSidebar = !['/login', '/change-password'].includes(location.pathname);

  return (
    <div className="app-container">
      {/* Conditionally render Sidebar */}
      {shouldShowSidebar && <Sidebar />}

      {/* Conditionally render the main content only for routes excluding login, register, and change-password */}
      {shouldShowSidebar ? (
        <div className="main-content">
          <Routes>
            {/* Main Application Routes */}
            
            <Route path="/" element={<Dashboard />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/post-job" element={<JobPosting />} />
              <Route path="/user" element={<UserManagement />} />
              <Route path="/candidates" element={<Candidates />} />
              <Route path="/resumes" element={<Resumes />} />
              <Route path="/candidate-pipeline" element={<CandidatePipeline />} />
              <Route path="/talent-pool" element={<TalentPool />} />
              <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      ) : (
        // For authentication routes, render them outside the main layout
        <div className="auth-pages">
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
          </Routes>
        </div>
      )}
    </div>
  );
}


export default App;

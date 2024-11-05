import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import JobPosting from './components/JobPosting.js';
import CandidatePipeline from './components/CandidatePipeline';
import Resumes from './components/Resumes';
import Candidates from './components/Candidates';
import Jobs from './components/JobList';
import Settings from './components/Settings';
import TalentPool from './components/TalentPool';
import Login from './components/auth/Login'; // Import Login component
import Signup from './components/auth/Signup'; // Import Signup component
import { getUserFromToken } from './auth';
import './components/styles/App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = getUserFromToken(); // Load user from token on mount
    setUser(loggedUser);
  }, []);

  // Function to update user state after login
  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <div className="app">
        {/* Render Sidebar only if the user is logged in */}
        { <Sidebar />}
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            
            {/* Login and Signup routes */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes */}
            (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/post-job" element={<JobPosting />} />
                <Route path="/candidates" element={<Candidates />} />
                <Route path="/resumes" element={<Resumes />} />
                <Route path="/candidate-pipeline" element={<CandidatePipeline />} />
                <Route path="/talent-pool" element={<TalentPool />} />
                <Route path="/settings" element={<Settings />} />
              </>
            ) 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

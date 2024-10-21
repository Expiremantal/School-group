// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Applicants from './Applicants';
import CandidateTracking from './CandidateTrackingSystem';
import Candidate from './CandidatePipeline';
import Resumes from './Resumes';
import TalentPool from './TalentPool';
import Settings from './Settings';
import JobPosting from './JobPosting';
import Logout from './Logout';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/candidate" element={<CandidateTracking />} />
          <Route path="/applicants" element={<Applicants />} />
          <Route path="/candidate-pipeline" element={<Candidate />} />
          <Route path="/resumes" element={<Resumes />} />
          <Route path="/talent-pool" element={<TalentPool />} />
          <Route path="/job-posting" element={<JobPosting />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

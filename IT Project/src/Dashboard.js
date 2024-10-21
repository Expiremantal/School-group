// Dashboard.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // Corrected import from chart.js
import './Dashboard.css';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  // Data for the pie charts
  const data = {
    labels: ['Applicants', 'Job Posts', 'Resumes'],
    datasets: [
      {
        data: [200, 100, 50],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="dashboard-content">
      <h1>Welcome to Your Dashboard</h1>
      {/* Placeholder for widgets */}
      <div className="stats">
        <div className="stat-box">Applicants: 200</div>
        <div className="stat-box">Job Posts: 10</div>
        <div className="stat-box">Resumes: 50</div>
      </div>
      <div className="charts">
        <h2>Stats Overview</h2>
        <div style={{ width: '400px', height: '400px' }}>
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

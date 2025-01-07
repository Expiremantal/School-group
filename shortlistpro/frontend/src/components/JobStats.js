import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Or use fetch

const JobStats = () => {
  const [statsData, setStatsData] = useState([
    { title: "Open Positions", value: 0, link: "/job-posting" },
    { title: "Applications Received", value: 0, link: "/resumes" },
    { title: "Interviews Scheduled", value: 0, link: "/interview-schedule" },
  ]);

  useEffect(() => {
    // Fetch data from individual APIs
    Promise.all([
      axios.get('http://localhost:8000/api/jobs'),
      axios.get('http://localhost:8000/api/v1/resumes'),
      axios.get('http://localhost:8000/api/v1/interviews') // Replace with your actual route for interviews
    ])
      .then(([jobsResponse, resumesResponse, interviewsResponse]) => {
        setStatsData([
          { title: "Open Positions", value: jobsResponse.data.count || 0, link: "/jobs" },
          { title: "Applications Received", value: resumesResponse.data.count || 0, link: "/resumes" },
          { title: "Interviews Scheduled", value: interviewsResponse.data.count || 0, link: "/interview-schedule" },
        ]);
      })
      .catch(error => {
        console.error('Error fetching job stats:', error);
      });
  }, []);

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px',
  };

  const cardStyle = {
    display: 'block',
    textDecoration: 'none',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    color: '#333',
  };

  const cardHoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  };

  const titleStyle = {
    margin: '0 0 10px',
    fontSize: '1.2rem',
    color: '#007BFF', // Primary color
  };

  const valueStyle = {
    margin: '0',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#444',
  };

  return (
    <div style={containerStyle}>
      {statsData.map((stat, index) => (
        <Link
          to={stat.link}
          key={index}
          style={cardStyle}
          onMouseOver={(e) => (e.currentTarget.style = { ...cardStyle, ...cardHoverStyle })}
          onMouseOut={(e) => (e.currentTarget.style = cardStyle)}
        >
          <h4 style={titleStyle}>{stat.title}</h4>
          <p style={valueStyle}>{stat.value}</p>
        </Link>
      ))}
    </div>
  );
};

export default JobStats;

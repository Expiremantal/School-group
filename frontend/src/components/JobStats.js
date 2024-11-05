import React from 'react';

const JobStats = () => {
  const statsData = [
    { title: "Open Positions", value: 10 },
    { title: "Applications Received", value: 150 },
    { title: "Interviews Scheduled", value: 25 },
  ];

  return (
    <div className="job-stats">
      {statsData.map((stat, index) => (
        <div className="stat-card" key={index}>
          <h4>{stat.title}</h4>
          <p>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default JobStats;

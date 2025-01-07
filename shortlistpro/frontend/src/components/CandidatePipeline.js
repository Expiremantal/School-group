import React, { useEffect, useState } from 'react';
import './styles/PipelineComponent.css';

const PipelineComponent = (companyId = "6736a243bb7177bd94fe223c") => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/applications/all', { // Fetch all applications
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch candidates');
      }
  
      const data = await response.json();
      console.log('Fetched candidates:', data);
      setCandidates(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchCandidates();
    const intervalId = setInterval(() => {
      fetchCandidates();
    }, 10000000000000000);
    return () => clearInterval(intervalId);
  }, []);

  const groupedCandidates = candidates.reduce((acc, candidate) => {
    const status = candidate.status || 'Unknown';
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(candidate);
    return acc;
  }, {});

  if (loading) return <p>Loading candidates...</p>;
  if (error) return (
    <div>
      <p>Error: {error}</p>
      <button onClick={fetchCandidates}>Retry</button>
    </div>
  );

  return (
    <div className="pipeline-container">
      <h1>Candidate Pipeline</h1>
      <div className="status-section">
        {Object.keys(groupedCandidates).map((status) => (
          <div
            className={`status-group ${status.toLowerCase().replace(' ', '-')}-group`}
            key={status}
          >
            <h2 className="status-title">{status}</h2>
            {groupedCandidates[status].length > 0 ? (
              <ul className="candidate-list">
                {groupedCandidates[status].map((candidate) => (
                  <li key={candidate._id} className="candidate-item">
                    <strong>{candidate.userId?.firstName|| 'N/A' } {candidate.userId?.lastName|| 'N/A'}</strong>
                    <br />
                    Experience: <em>{candidate.experience || 'N/A'}</em>
                    <br />
                    Position: <em>{candidate.jobId?.title}</em>
                    <br />
                    Skills: {candidate.skills?.join(', ')}
                  </li>
                ))}
              </ul>
            ) : (
              <p className ="no-candidates">No candidates under this status.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineComponent;
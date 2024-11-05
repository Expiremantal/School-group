import React, { useEffect, useState } from 'react';
import './styles/PipelineComponent.css';

const PipelineComponent = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/candidates');
        const data = await response.json();
        setCandidates(data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, []);

  const groupedCandidates = {
    'Under Consideration': candidates.filter(c => c.status === 'Under Consideration'),
    'Interview Scheduled': candidates.filter(c => c.status === 'Interview Scheduled'),
    'Rejected': candidates.filter(c => c.status === 'Rejected'),
  };

  return (
    <div className="pipeline-container">
      <h1>Candidate Pipeline</h1>
      <div className="status-section">
        {Object.keys(groupedCandidates).map(status => (
          <div className={`status-group ${status.toLowerCase().replace(' ', '-')}-group`} key={status}>
            <h2 className="status-title">{status}</h2>
            {groupedCandidates[status].length > 0 ? (
              <ul className="candidate-list">
                {groupedCandidates[status].map((candidate, index) => (
                  <li key={index} className="candidate-item">
                    <strong>{candidate.name}</strong> - Position: <em>{candidate.position}</em>
                    {status !== 'Rejected' && (
                      <>
                        <button onClick={() => updateCandidateStatus(candidate._id, 'Interview Scheduled')}>Schedule Interview</button>
                        <button onClick={() => updateCandidateStatus(candidate._id, 'Rejected')}>Reject</button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-candidates">No candidates under this status.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const updateCandidateStatus = async (id, newStatus) => {
  try {
    const response = await fetch(`http://localhost:8000/api/v1/candidates/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (response.ok) {
      const updatedCandidate = await response.json();
      console.log('Updated candidate:', updatedCandidate);
      // Optionally fetch candidates again or update the state to reflect the change
    } else {
      console.error('Failed to update candidate status');
    }
  } catch (error) {
    console.error('Error updating candidate status:', error);
  }
};

export default PipelineComponent;

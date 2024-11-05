// Interviews.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Interviews.css';

const INTERVIEW_TIMES = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
];

const Interviews = () => {
    const [candidates, setCandidates] = useState([]);
    const [interviews, setInterviews] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [interviewTime, setInterviewTime] = useState('');
    const [showModal, setShowModal] = useState(false);

    // Fetch all candidates from the API
    const fetchCandidates = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/candidates');
            setCandidates(response.data);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };

    useEffect(() => {
        fetchCandidates(); // Fetch candidates when the component mounts
    }, []);

    const handleAddInterview = async () => {
        if (selectedCandidate && interviewTime) {
            const newInterview = { ...selectedCandidate, time: interviewTime };
            setInterviews(prev => [...prev, newInterview]);

            // API call to update the candidate status to 'Interviewed'
            try {
                await axios.patch(`http://localhost:8000/api/v1/candidates/${selectedCandidate._id}/status`, {
                    status: 'Interviewed' // Update status to 'Interviewed'
                });
            } catch (error) {
                console.error('Error updating candidate status:', error);
            }

            // Reset state
            setSelectedCandidate(null);
            setInterviewTime('');
            setShowModal(false);
        }
    };

    return (
        <div className="interviews">
            <h2>Interviews</h2>
            <ul className="interview-list">
                {interviews.map((interview, index) => (
                    <li key={index}>
                        <strong>{interview.name}</strong> - {interview.time} - {interview.position}
                    </li>
                ))}
            </ul>
            <button className="add-interview-btn" onClick={() => setShowModal(true)}>
                + Add Interview
            </button>

            {showModal && (
                <div className="modal">
                    <h3>Add Interview</h3>
                    <label htmlFor="candidates">Select Candidate:</label>
                    <select id="candidates" onChange={e => setSelectedCandidate(candidates[e.target.value])}>
                        <option value="">Select a candidate</option>
                        {candidates.map((candidate, index) => (
                            <option key={candidate._id} value={index}>
                                {candidate.name} - {candidate.position}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="interview-time">Interview Time:</label>
                    <select
                        id="interview-time"
                        value={interviewTime}
                        onChange={e => setInterviewTime(e.target.value)}
                    >
                        <option value="">Select a time</option>
                        {INTERVIEW_TIMES.map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleAddInterview}>Add Interview</button>
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Interviews;

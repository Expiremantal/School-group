// Interviews.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Interviews.css';
import PieChart from './pieChart'; // Import the PieChart component

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
    const [refreshStatistics, setRefreshStatistics] = useState(false); // State to trigger statistics refresh

    // Fetch all candidates from the applicants API
    const fetchCandidates = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/applications'); // Change to the correct applicants API endpoint
            setCandidates(response.data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };

    useEffect(() => {
        fetchCandidates(); // Fetch candidates when the component mounts
    }, []);

    const handleAddInterview = async () => {
        if (selectedCandidate && interviewTime) {
            const newInterview = { ...selectedCandidate, time: interviewTime };
            setInterviews((prev) => [...prev, newInterview]);

            // API call to update the candidate status to 'Interviewed'
            try {
                await axios.patch(`http://localhost:8000/api/v1/applications/${selectedCandidate._id}`, {
                    status: 'Interviewed', // Update the status field in the application
                });
                setRefreshStatistics((prev) => !prev); // Toggle state to refresh statistics
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
            <PieChart title="Interview Statistics" refresh={refreshStatistics} />
            <ul className="interview-list">
                {interviews.map((interview, index) => (
                    <li key={index}>
                        <strong>{interview.userId.firstName} {interview.userId.lastName}</strong> - {interview.time} - {interview.jobId.title}
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
                    <select id="candidates" onChange={(e) => setSelectedCandidate(candidates[e.target.value])}>
                        <option value="">Select a candidate</option>
                        {candidates.map((candidate, index) => (
                            <option key={candidate._id} value={index}>
                                {candidate.userId.firstName} {candidate.userId.lastName} - {candidate.jobId.title}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="interview-time">Interview Time:</label>
                    <select
                        id="interview-time"
                        value={interviewTime}
                        onChange={(e) => setInterviewTime(e.target.value)}
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
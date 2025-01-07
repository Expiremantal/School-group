// InterviewSection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/InterviewSection.css'; // Optional: Create a specific CSS file for styling

const InterviewSection = () => {
    const [candidates, setCandidates] = useState([]);
    const [newInterview, setNewInterview] = useState({ candidateId: '', status: 'Interviewed' });
    const [interviewTime, setInterviewTime] = useState('');

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        const response = await axios.get('http://localhost:8000/api/v1/candidates');
        setCandidates(response.data);
    };

    const handleAddInterview = async () => {
        try {
            await axios.put(`http://localhost:8000/api/v1/candidates/${newInterview.candidateId}`, {
                status: newInterview.status,
                time: interviewTime // Send the selected time as well
            });
            fetchCandidates(); // Refresh candidates to show updated status
        } catch (error) {
            console.error('Error updating candidate status:', error);
        }
    };

    return (
        <div>
            <h2>Interview Section</h2>
            <select onChange={(e) => setNewInterview({ ...newInterview, candidateId: e.target.value })}>
                <option value="">Select Candidate</option>
                {candidates.map((candidate) => (
                    <option key={candidate._id} value={candidate._id}>
                        {candidate.name}
                    </option>
                ))}
            </select>
            <select onChange={(e) => setInterviewTime(e.target.value)} value={interviewTime}>
                <option value="">Select Interview Time</option>
                {INTERVIEW_TIMES.map((time, index) => (
                    <option key={index} value={time}>
                        {time}
                    </option>
                ))}
            </select>
            <button onClick={handleAddInterview}>Add Interview</button>
        </div>
    );
};

export default InterviewSection;

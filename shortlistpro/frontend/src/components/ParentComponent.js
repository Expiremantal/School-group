import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Interviews from './Interviews';
import Calendar from './Calendar'; // Import the calendar component

const ParentComponent = () => {
    const [candidates, setCandidates] = useState([]);
    const [interviews, setInterviews] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [interviewTime, setInterviewTime] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [interviewDates, setInterviewDates] = useState([]); // Default as an empty array

    // Fetch candidates from the backend
    const fetchCandidates = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/candidates');
            setCandidates(response.data);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    const handleAddInterview = async () => {
        if (selectedCandidate && interviewTime) {
            const newInterview = {
                ...selectedCandidate,
                time: interviewTime,
                date: selectedDate,
            };
            setInterviews((prev) => [...prev, newInterview]);

            // Update interview dates for the calendar
            setInterviewDates((prev) => [
                ...prev,
                { date: selectedDate.toDateString(), time: interviewTime, name: selectedCandidate.name },
            ]);

            // Update candidate status in the backend
            try {
                await axios.patch(`http://localhost:8000/api/v1/candidates/${selectedCandidate._id}/status`, {
                    status: 'Interviewed',
                });
            } catch (error) {
                console.error('Error updating candidate status:', error);
            }

            setSelectedCandidate(null);
            setInterviewTime('');
        }
    };

    return (
        <div>
            <Interviews
                candidates={candidates}
                selectedCandidate={selectedCandidate}
                setSelectedCandidate={setSelectedCandidate}
                interviewTime={interviewTime}
                setInterviewTime={setInterviewTime}
                handleAddInterview={handleAddInterview}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
            <Calendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                interviewDates={interviewDates} // Ensure it's always an array
            />
        </div>
    );
};

export default ParentComponent;

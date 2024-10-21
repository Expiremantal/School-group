import React, { useEffect, useState } from 'react';
import './TalentPool.css';

const TalentPool = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [departments, setDepartments] = useState([]);

    const toggleTalentPool = () => setIsOpen(!isOpen);

    const fetchDepartments = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/departments');
            const data = await response.json();
            setDepartments(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const addCandidate = (deptIndex, jobIndex) => {
        console.log(`Adding candidate to ${departments[deptIndex].name} - ${departments[deptIndex].jobs[jobIndex].title}`);
        // Add your logic here for adding a candidate
    };

    return (
        <div className="talent-pool-container">
            <button onClick={toggleTalentPool} className="toggle-btn">
                {isOpen ? 'Hide' : 'Show'} Talent Pool
            </button>

            {isOpen && (
                <div className="talent-pool">
                    <h2>Talent Pool</h2>
                    {departments.map((dept, deptIndex) => (
                        <div key={deptIndex} className="department-card">
                            <h3>{dept.name} Department</h3>
                            <div className="jobs-container">
                                {dept.jobs.map((job, jobIndex) => (
                                    <div key={jobIndex} className="job-card">
                                        <div className="job-header">
                                            <span className="job-title">
                                                {job.title} ({job.applicantCount})
                                            </span>
                                            <button className="add-btn" onClick={() => addCandidate(deptIndex, jobIndex)}>+</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TalentPool;

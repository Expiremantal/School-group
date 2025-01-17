import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles/TalentPool.module.css';

const TalentPool = () => {
    // State for departments, loading, and error handling
    const [departments, setDepartments] = useState([]);
    const [jobVisibility, setJobVisibility] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch talent pool data from the server
    const fetchTalentPoolData = async () => {
        try {
            const response = await axios.get('http://localhost:8001/api/v1/talentpool');
            setDepartments(response.data.departments || []); // Default to an empty array if undefined
            setLoading(false);
        } catch (error) {
            console.error("Error fetching talent pool data:", error);
            setError("Failed to load departments. Please try again.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTalentPoolData();
    }, []);

    // Function to toggle job visibility
    const toggleJobVisibility = (deptIndex, jobIndex) => {
        setJobVisibility(prevVisibility => ({
            ...prevVisibility,
            [`${deptIndex}-${jobIndex}`]: !prevVisibility[`${deptIndex}-${jobIndex}`]
        }));
    };

    // Function to add a candidate
    const addCandidate = async (deptIndex, jobIndex) => {
        const candidateName = prompt("Enter the candidate's name:");
        if (candidateName) {
            try {
                const deptId = departments[deptIndex]._id;  // Get the department ID
                const jobId = departments[deptIndex].jobs[jobIndex]._id;  // Get the job ID
                const response = await axios.post('http://localhost:8001/api/v1/talentpool/candidate', {
                    deptId,
                    jobId,
                    candidateName
                });
    
                // Check if the response is successful and show an alert
                if (response.status === 200) {
                    alert("Candidate added successfully!");
                    console.log("Added candidate:", response.data);
                    
                    // Re-fetch talent pool data to update the UI
                    fetchTalentPoolData();  
                }
            } catch (error) {
                console.error("Error adding candidate:", error);
                alert("Failed to add candidate. Please try again.");
            }
        }
    };
    
    // Function to delete a candidate
    const deleteCandidate = (deptIndex, jobIndex, candidateIndex) => {
        setDepartments(prevDepartments => {
            const updatedDepartments = [...prevDepartments];
            updatedDepartments[deptIndex].jobs[jobIndex].candidates.splice(candidateIndex, 1);
            updatedDepartments[deptIndex].jobs[jobIndex].applicantCount--;
            return updatedDepartments;
        });
    };

    // Render
    if (loading) return <p className={styles.talentPoolParagraph}>Loading departments...</p>;
    if (error) return <p className={styles.talentPoolParagraph}>{error}</p>;

    return (
        <div className={styles.talentPoolContainer}>
            <h2>Talent Pool</h2>
            {departments.length > 0 ? (
                departments.map((dept, deptIndex) => (
                    <div key={deptIndex} className={styles.departmentCard}>
                        <h3>{dept.name} Department</h3>
                        <div className={styles.jobsContainer}>
                            {dept.jobs && dept.jobs.length > 0 ? (
                                dept.jobs.map((job, jobIndex) => (
                                    <div key={jobIndex} className={styles.jobCard}>
                                        <div className={styles.jobHeader}>
                                            <span 
                                                onClick={() => toggleJobVisibility(deptIndex, jobIndex)} 
                                                className={styles.jobTitle}
                                            >
                                                {job.title} ({job.applicantCount || 0})
                                            </span>
                                            <button 
                                                className={styles.addBtn} 
                                                onClick={() => addCandidate(deptIndex, jobIndex)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        {jobVisibility[`${deptIndex}-${jobIndex}`] && (
                                            <div className={styles.candidatesList}>
                                                <h4>Candidates:</h4>
                                                <ul>
                                                    {job.candidates && job.candidates.length > 0 ? (
                                                        job.candidates.map((candidate, candidateIndex) => (
                                                            <li key={candidateIndex}>
                                                                {candidate.name}
                                                                <button 
                                                                    className='DeleteBtn' 
                                                                    onClick={() => deleteCandidate(deptIndex, jobIndex, candidateIndex)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li>No candidates available. <button onClick={() => addCandidate(deptIndex, jobIndex)}>Add Candidate</button></li>
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className={styles.talentPoolParagraph}>No jobs available in this department.</p>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p className={styles.talentPoolParagraph}>No departments found.</p>
            )}
        </div>
    );
};

export default TalentPool;

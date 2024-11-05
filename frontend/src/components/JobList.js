// JobList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/JobPosting.css';

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    // Fetch jobs when the component mounts
    useEffect(() => {
        fetchJobs();
    }, []);

    // Function to fetch jobs from the API
    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/jobs');
            setJobs(response.data); // Set the jobs state with data from the API
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    // Function to delete a job by its ID
    const deleteJob = async (jobId) => {
        try {
            await axios.delete(`http://localhost:8000/api/jobs/${jobId}`);
            fetchJobs(); // Refresh job list after deletion
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    return (
        <div className="job-list">
            <h2>Posted Jobs</h2>
            <table className="job-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Department</th>
                        <th>Job Title</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Requirements</th>
                        <th>Salary</th>
                        <th>Employment Type</th>
                        <th>Deadline</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job) => (
                        <tr key={job._id}>
                            <td>{job._id}</td>
                            <td>{job.department}</td>
                            <td>{job.jobTitle}</td>
                            <td>{job.location}</td>
                            <td>{job.description}</td>
                            <td>{job.requirements}</td>
                            <td>{job.salary}</td>
                            <td>{job.employmentType}</td>
                            <td>{new Date(job.deadline).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => deleteJob(job._id)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobList;

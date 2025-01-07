import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/JobPosting.css';

const JobList = () => {
    const [jobs, setJobs] = useState([]); // Define the state for jobs
    const [loading, setLoading] = useState(true); // Define the state for loading

    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/jobs/company/6736a243bb7177bd94fe223c');
            setJobs(response.data); // Update state with jobs from the specific company
            setLoading(false);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs(); // Fetch jobs on component mount
    }, []);

    const deleteJob = async (jobId) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/jobs/${jobId}`);
            fetchJobs(); // Refresh the job list after deletion
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>; // Show a loading message while fetching data
    }

    // Helper function to join all the requirements fields into one array
    const getRequirements = (requirements) => {
        const allRequirements = [
            ...requirements.skills,
            ...requirements.languages,
            ...requirements.frameworks,
            ...requirements.tools,
        ];
        return allRequirements.join(', '); // Join the array into a comma-separated string
    };

    return (
        <div className="job-list">
            <h2>Posted Jobs</h2>
            <table className="job-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Requirements</th>
                        <th>Salary</th>
                        <th>Location</th>
                        <th>Job Type</th>
                        <th>Experience</th>
                        <th>Position</th>
                        <th>Expiration Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job) => (
                        <tr key={job._id}>
                            <td>{job.title}</td>
                            <td>{job.description}</td>
                            <td>{getRequirements(job.requirements)}</td> {/* Get and display the requirements */}
                            <td>{job.salary}</td>
                            <td>{job.location}</td>
                            <td>{job.jobType}</td>
                            <td>{job.experience}</td>
                            <td>{job.position}</td>
                            <td>{new Date(job.expirationDate).toLocaleDateString()}</td>
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

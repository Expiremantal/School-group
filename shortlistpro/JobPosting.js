import React, { useState, useEffect } from 'react';
import styles from './JobPosting.module.css'; // Importing CSS Module

const JobPosting = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobRequirements, setJobRequirements] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [empType, setEmpType] = useState('');
    const [deadline, setDeadline] = useState('');
    const [postedJobs, setPostedJobs] = useState([]);

    const jobDetails = {
        "Software Engineer": {
            description: "Develop and maintain web applications.",
            requirements: "Experience with JavaScript, HTML, and CSS."
        },
        "Project Manager": {
            description: "Oversee project development from inception to completion.",
            requirements: "Proven experience as a project manager."
        },
        "Data Scientist": {
            description: "Analyze data and provide actionable insights.",
            requirements: "Experience with data analysis tools."
        }
    };

    const handleJobTitleChange = (e) => {
        const title = e.target.value;
        setJobTitle(title);

        // Reset description and requirements
        setJobDescription('');
        setJobRequirements('');

        // Fill job description and requirements
        if (jobDetails[title]) {
            setJobDescription(jobDetails[title].description);
            setJobRequirements(jobDetails[title].requirements);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newJob = {
            jobTitle,
            jobDescription,
            jobRequirements,
            jobLocation,
            salary,
            empType,
            deadline
        };
        
        try {
            await fetch('http://localhost:5000/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newJob)
            });
            fetchJobs(); // Refresh the posted jobs list
        } catch (error) {
            console.error('Error posting job:', error);
        }

        // Reset the form
        setJobTitle('');
        setJobDescription('');
        setJobRequirements('');
        setJobLocation('');
        setSalary('');
        setEmpType('');
        setDeadline('');
    };

    const fetchJobs = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/jobs');
            const data = await response.json();
            setPostedJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className={styles.section}>
            <h2 className={styles.sectionHeading}>Job Posting</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="jobTitle">Job Title:</label>
                <select id="jobTitle" value={jobTitle} onChange={handleJobTitleChange} required>
                    <option value="">Select Job Title</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="Data Scientist">Data Scientist</option>
                </select>

                <label htmlFor="jobDescription">Job Description:</label>
                <textarea id="jobDescription" value={jobDescription} readOnly required></textarea>

                <label htmlFor="jobRequirements">Requirements:</label>
                <textarea id="jobRequirements" value={jobRequirements} readOnly required></textarea>

                <label htmlFor="jobLocation">Job Location:</label>
                <select id="jobLocation" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} required>
                    <option value="">Select Location</option>
                    <option value="SF, California">SF, California</option>
                    <option value="New York, NY">New York, NY</option>
 <option value="Austin, TX">Austin, TX</option>
                </select>

                <label htmlFor="salary">Salary Range:</label>
                <select id="salary" value={salary} onChange={(e) => setSalary(e.target.value)} required>
                    <option value="">Select Salary Range</option>
                    <option value="$70,000 - $90,000">$70,000 - $90,000</option>
                    <option value="$90,000 - $110,000">$90,000 - $110,000</option>
                    <option value="$110,000 - $130,000">$110,000 - $130,000</option>
                </select>

                <label htmlFor="empType">Employment Type:</label>
                <select id="empType" value={empType} onChange={(e) => setEmpType(e.target.value)} required>
                    <option value="">Select Employment Type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                </select>

                <label htmlFor="deadline">Application Deadline:</label>
                <input type="date" id="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />

                <button type="submit">Post Job</button>
            </form>

            {postedJobs.length > 0 && (
                <>
                    <h2 className={styles.sectionHeading}>Posted Jobs</h2>
                    <ul id="jobList">
                        {postedJobs.map((job) => (
                            <li key={job.job_id}>
                                <strong>{job.job_title}</strong><br />
                                {job.job_description}<br />
                                Location: {job.location}<br />
                                Created At: {new Date(job.created_at).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default JobPosting;
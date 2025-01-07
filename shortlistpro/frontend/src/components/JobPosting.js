import React, { useState } from 'react';
import axios from 'axios';
import './styles/JobPosting.css';

const JobPosting = () => {
    // Define the company ID
    const COMPANY_ID = '6736a243bb7177bd94fe223c';

    const [jobs, setJobs] = useState([]);
    const [jobForm, setJobForm] = useState({
        title: '',
        description: '',
        skills: '',       // Flattened out fields for easier handling
        languages: '',
        frameworks: '',
        tools: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: '',
        expirationDate: '',
    });
    const [notification, setNotification] = useState({ message: '', type: '' });

    const employmentTypes = ['Full-Time', 'Part-Time', 'Contract', 'Internship'];
    const experienceLevels = ['Entry-Level', 'Mid-Level', 'Senior'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update the form data dynamically
        setJobForm({ ...jobForm, [name]: value });
    };

    const postJob = async () => {
        // Validate form fields
        if (Object.values(jobForm).some((field) => !field)) {
            setNotification({ message: 'Please fill in all fields.', type: 'error' });
            return;
        }

        // Prepare the requirements as an object
        const formattedRequirements = {
            skills: jobForm.skills.split(',').map(skill => skill.trim()),  // Convert comma-separated values to array
            languages: jobForm.languages.split(',').map(language => language.trim()),
            frameworks: jobForm.frameworks.split(',').map(framework => framework.trim()),
            tools: jobForm.tools.split(',').map(tool => tool.trim()),
        };

        // Prepare the job data
        const jobData = {
            ...jobForm,
            requirements: formattedRequirements, // Include the structured requirements
        };

        try {
            // Make requests to both routes using axios.all
            const [generalJobResponse, ] = await axios.all([
                axios.post('http://localhost:8000/api/v1/jobs', jobData), // Post to general jobs route
                 // Post to company-specific jobs route
            ]);

            if (generalJobResponse.status === 201 ) {
                setJobs([...jobs, generalJobResponse.data]); // Add job from the first response
                setJobForm({
                    title: '',
                    description: '',
                    skills: '',
                    languages: '',
                    frameworks: '',
                    tools: '',
                    salary: '',
                    location: '',
                    jobType: '',
                    experience: '',
                    position: '',
                    expirationDate: ''
                });
                setNotification({ message: 'Job posted successfully to both routes!', type: 'success' });
            }
        } catch (error) {
            console.error('Error posting job:', error);
            setNotification({ message: 'Failed to post job. Please try again.', type: 'error' });
        }

        // Clear notification after 3 seconds
        setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    };

    return (
        <div className="job-posting">
            <div className="form-container">
                <h2>Post a Job</h2>
                {notification.message && (
                    <div className={`notification ${notification.type}`}>
                        {notification.message}
                    </div>
                )}
                <form>
                    <input
                        type="text"
                        name="title"
                        value={jobForm.title}
                        onChange={handleChange}
                        placeholder="Job Title"
                        className="form-input"
                    />
                    <textarea
                        name="description"
                        value={jobForm.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="form-input"
                    />
                    <textarea
                        name="skills"
                        value={jobForm.skills}
                        onChange={handleChange}
                        placeholder="Skills (comma-separated)"
                        className="form-input"
                    />
                    <textarea
                        name="languages"
                        value={jobForm.languages}
                        onChange={handleChange}
                        placeholder="Languages (comma-separated)"
                        className="form-input"
                    />
                    <textarea
                        name="frameworks"
                        value={jobForm.frameworks}
                        onChange={handleChange}
                        placeholder="Frameworks (comma-separated)"
                        className="form-input"
                    />
                    <textarea
                        name="tools"
                        value={jobForm.tools}
                        onChange={handleChange}
                        placeholder="Tools (comma-separated)"
                        className="form-input"
                    />
                    <input
                        type="number"
                        name="salary"
                        value={jobForm.salary}
                        onChange={handleChange}
                        placeholder="Salary"
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="location"
                        value={jobForm.location}
                        onChange={handleChange}
                        placeholder="Location"
                        className="form-input"
                    />
                    <select
                        name="jobType"
                        value={jobForm.jobType}
                        onChange={handleChange}
                        className="form-input"
                    >
                        <option value="">Select Job Type</option>
                        {employmentTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <select
                        name="experience"
                        value={jobForm.experience}
                        onChange={handleChange}
                        className="form-input"
                    >
                        <option value="">Select Experience Level</option>
                        {experienceLevels.map((level) => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        name="position"
                        value={jobForm.position}
                        onChange={handleChange}
                        placeholder="Position"
                        className="form-input"
                    />
                    <input
                        type="date"
                        name="expirationDate"
                        value={jobForm.expirationDate}
                        onChange={handleChange}
                        placeholder="Expiration Date"
                        className="form-input"
                    />
                    <button type="button" onClick={postJob} className="form-button">Post Job</button>
                </form>
            </div>
        </div>
    );
};

export default JobPosting;

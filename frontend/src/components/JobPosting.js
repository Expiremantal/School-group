import React, { useState } from 'react';
import axios from 'axios';
import './styles/JobPosting.css';
import JobList from './JobList';

const JobPosting = () => {
    const [jobs, setJobs] = useState([]);
    const [currentForm, setCurrentForm] = useState(null);
    const [jobForm, setJobForm] = useState({
        department: '',
        jobTitle: '',
        province: '',
        location: '',
        description: '',
        requirements: '',
        salary: '',
        employmentType: '',
        deadline: '',
    });
    const [notification, setNotification] = useState({ message: '', type: '' });

    const departments = [
        "Human Resources", "Finance and Accounting", "Marketing", 
        "Sales", "Operations", "Information Technology (IT)", 
        "Customer Service", "Legal", "Purchasing"
    ];

    const jobTitlesByDepartment = {
        "Human Resources": ["HR Manager", "Recruitment Specialist", "Training and Development Coordinator"],
        "Finance and Accounting": ["Chief Financial Officer (CFO)", "Accountant", "Financial Analyst", "Financial Auditor", "Tax Consultant"],
        "Marketing": ["Marketing Manager", "Social Media Specialist", "Brand Strategist", "Brand Manager", "Social Media Manager"],
        "Sales": ["Sales Manager", "Account Executive", "Sales Representative"],
        "Operations": ["Operations Manager", "Production Supervisor", "Supply Chain Coordinator", "Supply Chain Manager", "Logistics"],
        "Information Technology (IT)": ["IT Manager", "Network Administrator", "Software Developer", "IT Support Specialist", "Systems Analyst"],
        "Customer Service": ["Customer Service Manager", "Call Center Representative", "Customer Support Specialist", "Customer Care Specialist"],
        "Legal": ["General Counsel", "Corporate Lawyer", "Compliance Officer"],
        "Purchasing": ["Purchasing Manager", "Procurement Specialist", "Buyer"]
    };

    const provinces = [
        "Western Cape", "Eastern Cape", "Northern Cape", "Free State", 
        "KwaZulu-Natal", "North West", "Gauteng", "Mpumalanga", "Limpopo"
    ];

    const employmentTypes = ["Full-time", "Part-time", "Contract", "Internship"];

    const toggleForm = (form) => {
        setCurrentForm(form);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobForm({ ...jobForm, [name]: value });

        if (name === 'department') {
            setJobForm((prevForm) => ({ ...prevForm, jobTitle: '' }));
        }
    };

    const postJob = async () => {
        if (Object.values(jobForm).some((field) => !field)) {
            setNotification({ message: 'Please fill in all fields.', type: 'error' });
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/jobs', jobForm);
            if (response.status === 201) {
                const newJob = response.data;
                setJobs([...jobs, newJob]);

                setJobForm({
                    department: '',
                    jobTitle: '',
                    province: '',
                    location: '',
                    description: '',
                    requirements: '',
                    salary: '',
                    employmentType: '',
                    deadline: '',
                });
                setNotification({ message: 'Job posted successfully!', type: 'success' });
                toggleForm(null);
            }
        } catch (error) {
            console.error("There was an error posting the job:", error);
            setNotification({ message: 'Failed to post job. Please try again.', type: 'error' });
        }

        setTimeout(() => setNotification({ message: '', type: '' }), 3000); // Clear after 3 seconds
    };

    const deleteJob = (jobId) => {
        setJobs(jobs.filter((job) => job.id !== jobId));
    };

    return (
        <div className="job-posting">
            <div className="main-content">
                <div className="form-container">
                    <h2>Post a Job</h2>
                    <form>
                        <select
                            name="department"
                            value={jobForm.department}
                            onChange={handleChange}
                            className="form-input"
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                        <select
                            name="jobTitle"
                            value={jobForm.jobTitle}
                            onChange={handleChange}
                            className="form-input"
                            disabled={!jobForm.department}
                        >
                            <option value="">Select Job Title</option>
                            {jobForm.department && jobTitlesByDepartment[jobForm.department]?.map((title) => (
                                <option key={title} value={title}>{title}</option>
                            ))}
                        </select>
                        <select
                            name="province"
                            value={jobForm.province}
                            onChange={handleChange}
                            className="form-input"
                        >
                            <option value="">Select Province</option>
                            {provinces.map((prov) => (
                                <option key={prov} value={prov}>{prov}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="location"
                            value={jobForm.location}
                            onChange={handleChange}
                            placeholder="Location"
                            className="form-input"
                        />
                        <input
                            type="text"
                            name="description"
                            value={jobForm.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="form-input"
                        />
                        <input
                            type="text"
                            name="requirements"
                            value={jobForm.requirements}
                            onChange={handleChange}
                            placeholder="Requirements"
                            className="form-input"
                        />
                        <input
                            type="text"
                            name="salary"
                            value={jobForm.salary}
                            onChange={handleChange}
                            placeholder="Salary"
                            className="form-input"
                        />
                        <select
                            name="employmentType"
                            value={jobForm.employmentType}
                            onChange={handleChange}
                            className="form-input"
                        >
                            <option value="">Select Employment Type</option>
                            {employmentTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <input
                            type="date"
                            name="deadline"
                            value={jobForm.deadline}
                            onChange={handleChange}
                            className="form-input"
                        />
                        <button type="button" onClick={postJob} className="form-button">Post Job</button>
                    </form>
                </div>
                {currentForm === 'view' && <JobList jobs={jobs} onDeleteJob={deleteJob} />}
            </div>
            {notification.message && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
        </div>
    );
};

export default JobPosting;

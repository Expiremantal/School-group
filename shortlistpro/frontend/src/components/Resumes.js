import React, { useState, useEffect } from 'react';
import styles from './styles/Resume.module.css';
import axios from 'axios';

const Resumes = ({ companyId }) => {
    const [resumes, setResumes] = useState([]);
    const [filteredResumes, setFilteredResumes] = useState([]);
    const [filter, setFilter] = useState('');
    const [criteria, setCriteria] = useState('');

    const filterOptions = {
        "Employment Status": ["Employed", "Unemployed"],
        "Relocation": ["Full relocation", "Partial relocation-commuting", "Temporary Relocation"],
        "Availability": ["Immediately", "2-3 weeks", "1 Month"],
        "Proficiency": ["Beginner", "Intermediate", "Expert"],
        "Working Style": ["Independent", "Collaborative", "Flexible"],
        "Citizenship": ["South African", "Non South African", "Non South African with a Work Permit", "Non South African without a Work Permit"],
        "Education Level": ["Matric (High School)", "Diploma", "Bachelor's Degree", "Honours Degree", "Master's Degree", "Doctorate (PhD)", "Other"],
        "Country": ["South Africa", "United States"],
        "Current Salary": ["0-50k", "50-100k", "100-150k", "150-200k", "200-250k", "250-300k", "300k+"],
        "Desired Salary": ["0-50k", "50-100k", "100-150k", "150-200k", "200-250k", "250-300k", "300k+"],
        "Ethnicity": ["Black", "White", "Coloured", "Indian/Asian", "Other", "Prefer not to disclose"],
        "Gender": ["Male", "Female", "Non-Binary", "Other", "Prefer not to disclose"],
        "Has Valid Driver's License": ["Yes", "No"],
        "Has Own Transport": ["Yes", "No"],
        "Is Employee": ["Yes", "No"],
        "Willing to Relocate": ["Yes Internationally", "Yes Within Country", "No"],
        "Work Experience": ["Less than 1 Year", "1-3 Years", "3-5 Years", "5+ Years"]
    };

    useEffect(() => {
        const fetchResumes = async () => {
            if (!filter && !criteria) return;

            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8000/api/v1/applications/resumes`, {
                    params: { companyId, filter, criteria },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const pendingResumes = response.data.filter((resume) => resume.status === 'Pending');
                setResumes(pendingResumes);
                setFilteredResumes(pendingResumes);
            } catch (error) {
                console.error('Error fetching resumes:', error.response ? error.response.data : error.message);
            }
        };

        fetchResumes();
    }, [companyId, filter, criteria]);

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
        setCriteria('');
    };

    const handleCriteriaChange = (e) => {
        const value = e.target.value;
        setCriteria(value);
    };

    const applyFilter = () => {
        const filtered = resumes.filter((resume) => {
            if (!criteria) return true;
            const field = filter.toLowerCase().replace(" ", "_");
            return resume.questions[field] && resume.questions[field].toString() === criteria;
        });
        setFilteredResumes(filtered);
    };

    const resetFilters = () => {
        setFilteredResumes(resumes);
        setFilter('');
        setCriteria('');
    };

    return (
        <div className={styles.resumePageContainer}>
            <div className={styles.resumeFilterSection}>
                <h2>Filter Resumes</h2>
                <div className={styles.resumeFlex}>
                    <div>
                        <label htmlFor="filter">Select a Filter:</label>
                        <select id="filter" value={filter} onChange={handleFilterChange}>
                            <option value="">Select...</option>
                            {Object.keys(filterOptions).map((option, index) => (
 <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="criteria">Select a Field:</label>
                        <select id="criteria" value={criteria} onChange={handleCriteriaChange} disabled={!filter}>
                            <option value="">Select...</option>
                            {filter && filterOptions[filter].map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <button className={styles.resumeButton} onClick={applyFilter}>Apply</button>
                    <button className={styles.resumeButton} onClick={resetFilters}>Reset Filters</button>
                </div>
            </div>

            <div>
                <h2>Resumes</h2>
                {filteredResumes.length > 0 ? (
                    filteredResumes.map((resume, index) => (
                        <div key={index} className={styles.resumeCard}>
                            <div className={styles.resumeHeader}>
                                <h3>{resume.userId.name}</h3>
                                <p className={styles.resumeJobTitle}>{resume.jobId.title} at {resume.jobId.company}</p>
                            </div>
                            <div className={styles.resumeDetails}>
                                <p><strong>Email:</strong> {resume.userId.email}</p>
                                <p><strong>Cell:</strong> {resume.userId.cellNumber || 'N/A'}</p>
                                <p><strong>Work:</strong> {resume.userId.workNumber}</p>
                                <p><strong>Citizenship:</strong> {resume.questions.citizenship || 'N/A'}</p>
                                <p><strong>Ethnicity:</strong> {resume.questions.ethnicity || 'N/A'}</p>
                                <p><strong>Gender:</strong> {resume.questions.gender || 'N/A'}</p>
                                <p>Status: {resume.status}</p>
                                <p>CV: <a href={resume.cvFilePath} download>{resume.cvFilePath.split('/').pop()}</a></p>
                            </div>
                            <button className={styles.talentPoolButton}>Add to Talent Pool</button>
                        </div>
                    ))
                ) : (
                    <p>No resumes match the filter criteria.</p>
                )}
            </div>
        </div>
    );
};

export default Resumes;
import React, { useState, useEffect } from 'react';
import styles from './Resume.css';

const Resumes = () => {
    const [resumes, setResumes] = useState([]);

    // Fetch resumes from the API
    useEffect(() => {
        fetch('http://localhost:5000/api/resumes')
            .then(res => res.json())
            .then(data => setResumes(data))
            .catch(err => console.error('Error fetching resumes:', err));
    }, []);

    return (
        <div className={styles.container}>
            <h2>Resumes</h2>
            {resumes.length > 0 ? (
                resumes.map((resume, index) => (
                    <div key={index} className={styles['resume-contact-box']}>
                        <div className={styles.flex}>
                            <div>
                                <h3><b>{resume.name}</b></h3>
                                <div className={styles.flex}>
                                    <div className={styles.primary}>
                                        <i className="fa fa-envelope"></i>
                                        <a href={`mailto:${resume.email}`}>{resume.email}</a>
                                    </div>
                                    |
                                    <div className={styles.primary}>
                                        <i className="fa fa-phone"></i>
                                        <a href={`tel:${resume.work_number}`}>{resume.work_number}</a>
                                    </div>
                                    |
                                    <div className={styles.primary}>
                                        <i className="fa fa-phone"></i>
                                        <a href={`tel:${resume.cell_number}`}>{resume.cell_number}</a>
                                    </div>
                                    |
                                    <i className="fa fa-location-dot"></i>
                                    <a href="#">{resume.applying_from}</a>
                                </div>
                            </div>
                        </div>

                        <div className={styles.flex}>
                            <div><b>Job Title: </b>{resume.job_title_applied_for}</div>
                            <div><b>Citizenship: </b>{resume.is_sa_citizen ? "Yes" : "No"}</div>
                            <div><b>ID Number: </b>{resume.id_number}</div>
                            <div><b>Passport Number: </b>{resume.passport_number}</div>
                            <div><b>Birth Date: </b>{resume.date_of_birth}</div>
                        </div>

                        <div className={styles.flex}>
                            <div className={styles.primary}>
                                <button onClick={() => window.open(`http://localhost:5000/files/${resume.cv_file_path}`, '_blank')}>View</button>
                                <a href={`http://localhost:5000/files/${resume.cv_file_path}`} download>Download</a>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No resumes found</p>
            )}
        </div>
    );
};

export default Resumes;

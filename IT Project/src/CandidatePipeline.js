import React, { useState, useEffect } from 'react';
import styles from './CandidatePipeline.module.css';

const CandidatePipeline = ({ approvedCandidates }) => {
    const [candidates, setCandidates] = useState(approvedCandidates || []);

    // Load saved candidates from local storage on mount
    useEffect(() => {
        const savedCandidates = JSON.parse(localStorage.getItem('candidates'));
        if (savedCandidates) {
            setCandidates(savedCandidates);
        }
    }, []);

    // Save candidate data in local storage
    useEffect(() => {
        localStorage.setItem('candidates', JSON.stringify(candidates));
    }, [candidates]);

    // Change candidate status and persist
    const changeStatus = (index, status) => {
        const updatedCandidates = [...candidates];
        updatedCandidates[index].status = status;
        setCandidates(updatedCandidates);
    };

    const statuses = ["Under Consideration", "Shortlisted", "Approved", "Unsuccessful"];

    return (
        <div className={styles.container}>
            <header>
                <h1>Candidate Pipeline</h1>
            </header>

            {statuses.map((status) => (
                <div key={status} className={styles.pipelineSection}>
                    <h2>{status}</h2>
                    <ul>
                        {candidates.filter(c => c.status === status).map((candidate, index) => (
                            <li key={index}>
                                <a href={`candidate.html?name=${encodeURIComponent(candidate.name)}`}>
                                    {candidate.name}
                                </a> - {candidate.position}
                                <select
                                    value={candidate.status}
                                    onChange={(e) => changeStatus(index, e.target.value)}
                                >
                                    {statuses.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default CandidatePipeline;

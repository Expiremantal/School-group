import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import { fetchPendingApplications } from './api';
import './styles/ATSComponent.css';

const Candidates = ({ token, onStatusChange }) => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rankedCandidates, setRankedCandidates] = useState([]);
    const [filters, setFilters] = useState({
        companyId: '',
        skillsRequired: '',
        experienceRequired: '',
        educationRequired: '',
        certificationsRequired: '',
        locationRequired: ''
    });

    const fetchCandidates = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchPendingApplications(token, filters);
            console.log('Fetched Candidates:', data);
            setCandidates(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch candidates');
        } finally {
            setLoading(false);
        }
    };

   

    const normalizeText = (text) =>
        typeof text === 'string' ? text.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().trim() : '';

    const rankCandidates = () => {
        console.log("Ranking candidates with the following criteria:");
        console.log("Skills:", filters.skillsRequired);
        console.log("Experience:", filters.experienceRequired);
        console.log("Education:", filters.educationRequired);
        console.log("Certifications:", filters.certificationsRequired);
        console.log("Location:", filters.locationRequired);

        if (!filters.skillsRequired && !filters.experienceRequired && !filters.educationRequired && !filters.certificationsRequired && !filters.locationRequired) {
            alert('Please fill at least one filter to rank candidates.');
            return;
        }

        const jobRequirements = {
            skills: filters.skillsRequired.split(',').map(normalizeText),
            experience: parseInt(filters.experienceRequired),
            education: normalizeText(filters.educationRequired),
            certifications: filters.certificationsRequired.split(',').map(normalizeText),
            location: normalizeText(filters.locationRequired),
        };
        
        const ranked = candidates
            .map((candidate) => {
                let score = 0;

                const candidateSkills = candidate.skills?.map(normalizeText) || [];
                const candidateExperience = candidate.questions?.workExperience || 0;
                const candidateEducation = normalizeText(candidate.education || '');
                const candidateCertifications = candidate.certifications?.map(normalizeText) || [];
                const candidateLocation = normalizeText(candidate.location || '');

                jobRequirements.skills.forEach((skill) => {
                    if (candidateSkills.includes(skill)) {
                        score += 1;
                    }
                });

                if (!isNaN(jobRequirements.experience)) {
                    const experienceDifference = Math.abs(candidateExperience - jobRequirements.experience);
                    if (experienceDifference === 0) {
                        score += 5;
                    } else if (experienceDifference <= 1) {
                        score += 3;
                    } else if (experienceDifference <= 3) {
                        score += 1;
                    }
                }

                if (candidateEducation.includes(jobRequirements.education)) {
                    score += 3;
                }

                jobRequirements.certifications.forEach((cert) => {
                    if (candidateCertifications.includes(cert)) {
                        score += 1.5;
                    }
                });

                if (candidateLocation.includes(jobRequirements.location)) {
                    score += 2;
 }

                const maxScore = 20;
                const percentageScore = ((score / maxScore) * 100).toFixed(2);
                return { ...candidate, score: percentageScore };
            })
            .sort((a, b) => b.score - a.score);
            console.log('Ranked Candidates:', rankedCandidates);
        setRankedCandidates(ranked);
    };

    const handleClear = () => {
        setFilters({
            companyId: '',
            skillsRequired: '',
            experienceRequired: '',
            educationRequired: '',
            certificationsRequired: '',
            locationRequired: ''
        });
        setRankedCandidates([]);
    };

    const handleDownloadReport = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('ShortlistPro Top Candidates Report', 14, 20);
        doc.setFontSize(12);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

        const topCandidates = rankedCandidates.slice(0, 5);
        const tableColumns = ['Name', 'Skills', 'Experience', 'Education', 'Certifications', 'Location', 'Match %', 'Status'];
        const tableRows = topCandidates.map((candidate) => [
            candidate.name,
            Array.isArray(candidate.skills) ? candidate.skills.join(', ') : 'N/A',
            `${candidate.experience || 0} years`,
            candidate.education || 'N/A',
            Array.isArray(candidate.certifications) ? candidate.certifications.join(', ') : 'N/A',
            candidate.location || 'N/A',
            `${candidate.score || 0}%`,
            candidate.status || 'N/A',
        ]);

        doc.autoTable({
            startY: 40,
            head: [tableColumns],
            body: tableRows,
            styles: { fontSize: 10, cellPadding: 2 },
            theme: 'grid',
            headStyles: { fillColor: [41, 128, 185] },
            alternateRowStyles: { fillColor: [230, 240, 255] },
        });

        doc.setFontSize(10);
        doc.text('ShortlistPro | Candidate Report', 14, doc.internal.pageSize.height - 10);
        doc.save(`ShortlistPro_Candidate_Report_${new Date().toLocaleDateString()}.pdf`);
    };
   
    const updateStatus = async (id, status) => {
        try {
            console.log(`Updating status for application ID ${id} to ${status}`);
            
            if (!id) {
                throw new Error('Application ID is undefined');
            }
            
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:8000/api/v1/applications/${id}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            // Update candidates list in state
            setCandidates((prev) =>
                prev.map((app) =>
                    app._id === id ? { ...app, status: response.data.status } : app
                )
            );
    
            // Optional callback if provided
            if (onStatusChange) {
                onStatusChange(id, status);
            }
        } catch (error) {
            console.error('Error updating ATS application status:', error);
            setError('Failed to update ATS application status. Please try again.');
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, [filters]);

    
    const shortlistedCandidates = rankedCandidates.filter((candidate) => 
        candidate.status === 'Pending' || candidate.status === 'Shortlisted' || candidate.status === 'Pending'
        );
        console.log('Shortlisted Candidates:', shortlistedCandidates);
        
    // Fetch candidates on component mount
    
    return (
        <div className="container">
            <h1>Candidate Tracking System</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    rankCandidates();
                }}
            >
                <label>Required Skills:</label>
                <input type="text" value={filters.skillsRequired} onChange={(e) => setFilters({ ...filters, skillsRequired: e.target.value })} />
                <label>Required Experience:</label>
                <input type="number" value={filters.experienceRequired} onChange={(e) => setFilters({ ...filters, experienceRequired: e.target.value })} />
                <label>Required Education:</label>
                <input type="text" value={filters.educationRequired} onChange={(e) => setFilters({ ...filters, educationRequired: e.target.value })} />
                <label>Required Certifications:</label>
                <input type="text" value={filters.certificationsRequired} onChange={(e) => setFilters({ ...filters, certificationsRequired: e.target.value })} />
                <label>Required Location:</label>
                <input type="text" value={filters.locationRequired} onChange={(e) => setFilters({ ...filters, locationRequired: e.target.value })} />
 <button type="submit" onClick={fetchCandidates}>Search</button>
            </form>
            <button onClick={handleClear}>Clear Filters</button>

            <h2>Shortlisted Candidates</h2>
            <ul>
    {shortlistedCandidates.map((candidate) => {
        if (!candidate.id) {
            console.warn('Candidate _id is missing:', candidate);
            return null; // If candidate does not have an _id, we skip rendering it
        }
        return (
            <li key={candidate.id}>
                <strong>{candidate.name}</strong> - {candidate.position} - {candidate.matchPercentage}%
                <br />
                Skills: {candidate.skills?.join(', ')}
                <br />
                Experience: {candidate.experience || 'N/A'}
                <br />
                Education: {candidate.education || 'N/A'}
                <br />
                Certifications: {candidate.certifications?.join(', ') || 'N/A'}
                <br />
                Location: {candidate.location || 'N/A'}
                <br />
                Status:
                <select
                    value={candidate.status}
                    onChange={(e) => {
                        console.log('Candidate ID:', candidate.id);
                        updateStatus(candidate.id, e.target.value);
                    }}
                >
                    <option value="Pending">Pending</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Accepted">Accepted</option>
                </select>
            </li>
        );
    })}
</ul>

            <button onClick={handleDownloadReport}>Download Report</button>
            {/* Debugging logs */}
            <div>
                {/*<h3>Debug Information</h3>
               <pre>{JSON.stringify({ candidates, rankedCandidates, error }, null, 2)}</pre>*/}
            </div>
        </div>
    );
};

export default Candidates;
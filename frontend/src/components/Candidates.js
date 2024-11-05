import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './styles/ATSComponent.css';

const ATSComponent = ({ onUpdatePipeline }) => {
    const [skills, setSkills] = useState('');
    const [experience, setExperience] = useState('');
    const [education, setEducation] = useState('');
    const [certifications, setCertifications] = useState('');
    const [location, setLocation] = useState('');
    const [rankedCandidates, setRankedCandidates] = useState([]);
    const [cvs, setCvs] = useState([]);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/candidates');
                setCvs(response.data);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };
        fetchCandidates();
    }, []);

    const rankCandidates = () => {
        const jobRequirements = {
            skills: skills.split(',').map(s => s.trim()),
            experience: experience.split(',').map(e => e.trim()),
            education: education.split(',').map(ed => ed.trim()),
            certifications: certifications.split(',').map(c => c.trim()),
            location: location.trim(),
        };
    
        const ranked = cvs.map(cv => {
            let score = 0;
    
            // Ensure cv.skills is an array; if it's not, handle it gracefully
            const candidateSkills = Array.isArray(cv.skills) ? cv.skills.join(', ') : (cv.skills || '');
    
            jobRequirements.skills.forEach(skill => {
                // Check if candidateSkills is a string before calling toLowerCase
                if (typeof candidateSkills === 'string' && candidateSkills.toLowerCase().includes(skill.toLowerCase())) {
                    score += 3;
                }
            });
    
            const maxScore = 15;
            const percentageScore = ((score / maxScore) * 100).toFixed(2);
            return { ...cv, score: percentageScore };
        }).sort((a, b) => b.score - a.score);
    
        setRankedCandidates(ranked);
    };

    const handleClear = () => {
        setSkills('');
        setExperience('');
        setEducation('');
        setCertifications('');
        setLocation('');
        setRankedCandidates([]);
    };

    const handleDownloadReport = () => {
        const doc = new jsPDF();

        const title = "ShortlistPro Top Candidates Report";
        doc.setFontSize(18);
        doc.text(title, 14, 20);

        const subtitle = `Generated on: ${new Date().toLocaleDateString()}`;
        doc.setFontSize(12);
        doc.text(subtitle, 14, 30);

        const topCandidates = rankedCandidates.slice(0, 5);
        const tableColumns = ["Name", "Skills", "Experience", "Education", "Certifications", "Location", "Match %", "Status"];
        const tableRows = topCandidates.map(candidate => [
            candidate.name,
            Array.isArray(candidate.skills) ? candidate.skills.join(", ") : "N/A",
            `${candidate.experience || 0} years`,
            candidate.education || "N/A",
            Array.isArray(candidate.certifications) ? candidate.certifications.join(", ") : "N/A",
            candidate.location || "N/A",
            `${candidate.score || 0}%`,
            candidate.status || "N/A"
        ]);

        doc.autoTable({
            startY: 40,
            head: [tableColumns],
            body: tableRows,
            styles: { fontSize: 10, cellPadding: 2 },
            theme: 'grid',
            headStyles: { fillColor: [41, 128, 185] },
            alternateRowStyles: { fillColor: [230, 240, 255] }
        });

        doc.setFontSize(10);
        doc.text("ShortlistPro | Candidate Report", 14, doc.internal.pageSize.height - 10);
        doc.save(`ShortlistPro_Candidate_Report_${new Date().toLocaleDateString()}.pdf`);
    };

    const updateCandidateStatus = async (candidateId, newStatus) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/candidates/${candidateId}`, { status: newStatus });
            
            if (response.status === 200) {
                console.log(`Status updated for candidate ${candidateId} to ${newStatus}`);
                setRankedCandidates(prevCandidates => prevCandidates.map(candidate => 
                    candidate._id === candidateId ? { ...candidate, status: newStatus } : candidate
                ));
                alert(`Status updated for candidate to ${newStatus}`);
            } else {
                console.error("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("Failed to update candidate status:", error);
            alert("Failed to update status. Please try again.");
        }
    };

    const handleStatusChange = (candidateId, newStatus) => {
        updateCandidateStatus(candidateId, newStatus);
    };

    return (
        <div className="container">
            <h1>Candidate Tracking System</h1>
            <h2>Search for Candidates</h2>
            <form id="searchForm" onSubmit={e => { e.preventDefault(); rankCandidates(); }}>
                {/* Form Fields */}
                <label htmlFor="skills">Required Skills:</label>
                <input
                    type="text"
                    id="skills"
                    value={skills}
                    onChange={e => setSkills(e.target.value)}
                    className="rounded-input"
                    placeholder="e.g. JavaScript, React"
                />
                <label htmlFor="experience">Required Experience:</label>
                <input
                    type="text"
                    id="experience"
                    value={experience}
                    onChange={e => setExperience(e.target.value)}
                    className="rounded-input"
                    placeholder="e.g. 2 years in frontend development"
                />
                <label htmlFor="education">Required Education:</label>
                <input
                    type="text"
                    id="education"
                    value={education}
                    onChange={e => setEducation(e.target.value)}
                    className="rounded-input"
                    placeholder="e.g. Bachelor's degree in Computer Science"
                />
                <label htmlFor="certifications">Required Certifications:</label>
                <input
                    type="text"
                    id="certifications"
                    value={certifications}
                    onChange={e => setCertifications(e.target.value)}
                    className="rounded-input"
                    placeholder="e.g. AWS Certified"
                />
                <label htmlFor="location">Required Location:</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="rounded-input"
                    placeholder="e.g. New York"
                />
                <button type="submit" className="button">Search</button>
                <button type="button" className="button" onClick={handleClear}>Clear</button>
            </form>

            <h2>Ranking Results</h2>
            <ul id="results">
                {rankedCandidates.map(candidate => (
                    <li key={candidate._id}>
                        <strong>{candidate.name}</strong><br />
                        Skills: {candidate.skills}<br />
                        Experience: {candidate.experience}<br />
                        Education: {candidate.education}<br />
                        Certifications: {candidate.certifications}<br />
                        Location: {candidate.location}<br />
                        Match Percentage: {candidate.score}%<br />
                        <div className="status-container">
                            <label htmlFor={`statusDropdown-${candidate._id}`}>Status:</label>
                            <select
                                id={`statusDropdown-${candidate._id}`}
                                value={candidate.status}
                                onChange={(e) => handleStatusChange(candidate._id, e.target.value)}
                            >
                                <option value="Under Consideration">Under Consideration</option>
                                <option value="Interview Scheduled">Interview Scheduled</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </li>
                ))}
            </ul>

            <button type="button" className="button" onClick={handleDownloadReport}>
                Download Report
            </button>
        </div>
    );
};

export default ATSComponent;

import React, { useState, useEffect } from 'react';
import './CandidateTrackingSystem.css'; 
import CandidatePipeline from './CandidatePipeline';

const CandidateTrackingSystem = () => {
    const [skills, setSkills] = useState('');
    const [experience, setExperience] = useState('');
    const [education, setEducation] = useState('');
    const [rankedCandidates, setRankedCandidates] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [approvedCandidates, setApprovedCandidates] = useState([]); 

    // Fetch candidates from the backend
    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/candidates');
                const data = await response.json();
                setCandidates(data);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };
        fetchCandidates();
    }, []);

    const rankCandidates = (jobRequirements) => {
        return candidates.map(cv => {
            let score = 0;

            // Check skills
            jobRequirements.skills.forEach(skill => {
                if (cv.skills.toLowerCase().includes(skill.toLowerCase())) {
                    score += 3; // Higher weight for skills
                }
            });

            // Check experience
            jobRequirements.experience.forEach(exp => {
                if (cv.experience.toLowerCase().includes(exp.toLowerCase())) {
                    score += 2;
                }
            });

            // Check education
            jobRequirements.education.forEach(edu => {
                if (cv.education.toLowerCase().includes(edu.toLowerCase())) {
                    score += 1;
                }
            });

            return { ...cv, score };
        }).sort((a, b) => b.score - a.score); 
    };

    const updateCandidateStatus = (candidateName, newStatus) => {
        setCandidates(prevCandidates => 
            prevCandidates.map(candidate => 
                candidate.name === candidateName ? { ...candidate, status: newStatus } : candidate
            )
        );

        if (newStatus === "Approved") {
            const approvedCandidate = candidates.find(c => c.name === candidateName);
            setApprovedCandidates(prev => [...prev, approvedCandidate]);
        }
        console.log(`${candidateName} status updated to ${newStatus}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const jobRequirements = {
            skills: skills.split(',').map(skill => skill.trim()),
            experience: experience.split(',').map(exp => exp.trim()),
            education: education.split(',').map(edu => edu.trim())
        };

        const ranked = rankCandidates(jobRequirements);
        setRankedCandidates(ranked);
    };

    return (
        <div>
            <header id="header">
                <h2>ShortlistPRO</h2>
            </header>

            <div className="container">
                <h1>Search for Candidates</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="skills">Required Skills (comma-separated):</label>
                    <input 
                        type="text" 
                        id="skills" 
                        placeholder="E.g., JavaScript, HTML, CSS" 
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                    />

                    <label htmlFor="experience">Required Experience (comma-separated):</label>
                    <input 
                        type="text" 
                        id="experience" 
                        placeholder="E.g., 2 years in frontend development" 
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                    />

                    <label htmlFor="education">Required Education (comma-separated):</label>
                    <input 
                        type="text" 
                        id="education" 
                        placeholder="E.g., Bachelor's degree in Computer Science" 
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                    />

                    <button type="submit" className="button">Search</button>
                </form>

                <h2>Ranking Results</h2>
                <ul id="results">
                    {rankedCandidates.map(candidate => (
                        <li key={candidate.name}>
                            <div>
                                <strong>{candidate.name}</strong><br />
                                Skills: {candidate.skills}<br />
                                Experience: {candidate.experience}<br />
                                Education: {candidate.education}<br />
                                <strong>Score: {candidate.score}</strong>
                            </div>
                            <div>
                                <select 
                                    value={candidate.status || "under consideration"} 
                                    onChange={(e) => updateCandidateStatus(candidate.name, e.target.value)}
                                    className="status-dropdown"
                                >
                                    <option value="under consideration">Under Consideration</option>
                                    <option value="shortlisted">Shortlisted</option>
                                    <option value="approved">Approved</option>
                                    <option value="unsuccessful">Unsuccessful</option>
                                </select>
                            </div>
                        </li>
                    ))}
                </ul>

                <CandidatePipeline approvedCandidates={approvedCandidates} />
            </div>
        </div>
    );
};

export default CandidateTrackingSystem;

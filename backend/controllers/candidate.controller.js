import Candidate from '../models/candidate.models.js';

// Fetch all candidates
const getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update candidate status
const updateCandidateStatus = async (req, res) => {
    const { candidateId } = req.params; // Use candidateId from the route parameters
    const { status: newStatus } = req.body;

    try {
        const updatedCandidate = await Candidate.findByIdAndUpdate(
            candidateId,
            { status: newStatus },
            { new: true } // Return the updated document
        );

        if (!updatedCandidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        res.status(200).json(updatedCandidate);
    } catch (error) {
        console.error("Error updating candidate:", error); // Log the error for debugging
        res.status(500).json({ message: error.message });
    }
};

// Add a new candidate
const addCandidate = async (req, res) => {
    const { name, skills, experience, education, certifications, location } = req.body;

    const newCandidate = new Candidate({
        name,
        skills,
        experience,
        education,
        certifications,
        location,
    });

    try {
        const savedCandidate = await newCandidate.save();
        res.status(201).json(savedCandidate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCandidateStatistics = async (req, res) => {
    try {
        const totalCandidates = await Candidate.countDocuments();
        const interviewedCandidates = await Candidate.countDocuments({ status: 'Interviewed' });

        res.status(200).json({
            total: totalCandidates,
            interviewed: interviewedCandidates,
        });
    } catch (error) {
        console.error("Error fetching candidate statistics:", error);
        res.status(500).json({ message: error.message });
    }
};

// Export all functions
export default {
    getAllCandidates,
    updateCandidateStatus,
    addCandidate,
    getCandidateStatistics,
};

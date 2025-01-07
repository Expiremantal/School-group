// controllers/interviews.controller.js
import Interview from '../models/interviews.models.js';

// Add a new interview
const addInterview = async (req, res) => {
    try {
        const newInterview = new Interview(req.body);
        await newInterview.save();
        res.status(201).json({ success: true, data: newInterview });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating interview', error });
    }
};

// Get all interviews
const getAllInterviews = async (req, res) => {
    try {
        const interviews = await Interview.find().populate('candidateId');
        res.status(200).json({ success: true, data: interviews });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching interviews', error });
    }
};

// Get an interview by ID
const getInterviewById = async (req, res) => {
    try {
        const interview = await Interview.findById(req.params.id).populate('candidateId');
        if (!interview) {
            return res.status(404).json({ success: false, message: 'Interview not found' });
        }
        res.status(200).json({ success: true, data: interview });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching interview', error });
    }
};

// Update an interview
const updateInterview = async (req, res) => {
    try {
        const updatedInterview = await Interview.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedInterview) {
            return res.status(404).json({ success: false, message: 'Interview not found' });
        }
        res.status(200).json({ success: true, data: updatedInterview });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating interview', error });
    }
};

// Delete an interview
const deleteInterview = async (req, res) => {
    try {
        const deletedInterview = await Interview.findByIdAndDelete(req.params.id);
        if (!deletedInterview) {
            return res.status(404).json({ success: false, message: 'Interview not found' });
        }
        res.status(200).json({ success: true, message: 'Interview deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting interview', error });
    }
};

export default {
    addInterview,
    getAllInterviews,
    getInterviewById,
    updateInterview,
    deleteInterview
};

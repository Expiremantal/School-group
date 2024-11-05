// shortlistpro/controllers/jobPosting.controller.js
import Job from '../models/jobPosting.model.js';

// Fetch all jobs
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();  // Fetches all jobs from the database
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new job
export const addJob = async (req, res) => {
    try {
        const job = new Job(req.body);  // Creates a new job based on request body
        await job.save();
        res.status(201).json({ message: 'Job added successfully', data: job });
    } catch (error) {
        res.status(500).json({ message: 'Error adding job', error: error.message });
    }
};

// Delete a job by ID
export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findByIdAndDelete(id);  // Deletes job by ID
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ message: 'Job deleted successfully', data: job });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting job', error: error.message });
    }
};

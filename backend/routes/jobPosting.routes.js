// shortlistpro/routes/jobPosting.routes.js
import express from 'express';
import { getJobs, addJob, deleteJob } from '../controllers/jobPosting.controller.js';

const router = express.Router();

// Route to fetch all jobs
router.get('/', getJobs);

// Route to add a new job
router.post('/', addJob);

// Route to delete a job by ID
router.delete('/:id', deleteJob);

export default router;

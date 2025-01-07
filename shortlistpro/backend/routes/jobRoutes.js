import express from 'express';
import { createJob, getAllJobs, deleteJob , getJobsByCompany} from '../controllers/jobController.js';

const router = express.Router();

// POST /api/jobs - Create a new job
router.post('/jobs', createJob);

// GET /api/jobs - Get all jobs
router.get('/jobs', getAllJobs);

// DELETE /api/jobs/:id - Delete a job

router.delete('/jobs/:id', deleteJob);
// GET /api/jobs/company/:companyId - Get jobs by company ID
router.get('/jobs/company/:companyId', getJobsByCompany);


export default router;

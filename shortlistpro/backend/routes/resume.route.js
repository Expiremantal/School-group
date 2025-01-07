// resume.route.js
import express from 'express';
import { getResumesAndFiltered, addResume } from '../controllers/applicationController.js';
import authenticate from '../middleware/auth.js'; // Authentication middleware

const router = express.Router();

// Route to fetch and filter resumes
router.get('/applications/resumes', authenticate, getResumesAndFiltered);

// Route to add a new resume
router.post('/resumes', authenticate, addResume);

export default router;
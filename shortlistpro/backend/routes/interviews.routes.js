import express from 'express';
import interviewController from '../controllers/interviews.controller.js';

const router = express.Router();

// Routes for interview operations
router.post('/add', interviewController.addInterview);
router.get('/', interviewController.getAllInterviews);
router.get('/:id', interviewController.getInterviewById);
router.put('/:id', interviewController.updateInterview);
router.delete('/:id', interviewController.deleteInterview);

export default router;

import express from 'express';
import candidateController from '../controllers/candidate.controller.js';

const router = express.Router();

// Route to get all candidates
router.get('/candidates', candidateController.getAllCandidates);

// Route to update candidate status
router.put('/candidates/:candidateId', candidateController.updateCandidateStatus);

// Route to update candidate status
router.patch('/:candidateId/status', candidateController.updateCandidateStatus);

// Route to add a new candidate
router.post('/candidates', candidateController.addCandidate);

// Statistics route
router.get('/candidates/statistics', candidateController.getCandidateStatistics);

export default router;

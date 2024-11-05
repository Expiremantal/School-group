import express from 'express';
import {
    addTalentPoolData,
    getTalentPool,
    addCandidate,
    deleteCandidate
} from '../controllers/talentPool.controller.js';

const router = express.Router();

// Route to fetch all talent pool data
router.get('/', getTalentPool);

// Route to add new talent pool data (change from GET to POST)
router.post('/', addTalentPoolData); // Corrected method from GET to POST

// Route to add a new candidate to a specific job
router.post('/candidate', addCandidate);

// Route to delete a candidate from a specific job
router.delete('/candidate/:deptId/:jobId/:candidateId', deleteCandidate);

export default router;

// routes/settings.routes.js
import express from 'express';
import {
    getUserSettings,
    updateUserSettings,
} from '../controllers/settings.controller.js';

const router = express.Router();

// Route to get user settings
router.get('/:userId', getUserSettings);

// Route to update user settings
router.put('/:userId', updateUserSettings);

export default router;
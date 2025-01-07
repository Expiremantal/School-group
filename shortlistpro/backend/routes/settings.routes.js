// routes/settings.routes.js
import express from 'express';
import { getUserSettings, updateUserSettings, changePassword} from '../controllers/settings.contoller.js';

const router = express.Router();

// Route to get user settings
router.get('/:userId', getUserSettings);

// Route to update user settings
router.put('/:userId', updateUserSettings);

// Route to change user password
router.put('/:userId/change-password', changePassword);

export default router;

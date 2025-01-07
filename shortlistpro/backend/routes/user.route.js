// routes/user.route.js
import express from 'express';
import { getAllUsers, updateUser, registerUser, updateUserStatus , loginUser, updateUserProfile, getUserSettings} from '../controllers/user.controllers.js';
import authenticate from '../middleware/auth.js';

const router = express.Router();

// Add login route
router.post('/login', loginUser);

// Route to get all users (requires authentication)
router.get('/users', authenticate, getAllUsers);

// Route to update user details (requires authentication)
router.put('/users/:id', authenticate, updateUser);

// Route to register a new user (requires no authentication)
router.post('/register', registerUser);

// Route to update user status (e.g., role, application status)
router.put('/users/:id/status', authenticate, updateUserStatus);

// route to update account settings
router.put('/user/:id', authenticate, updateUserProfile);
//Route to get account settings
router.get('/user/:id', authenticate, getUserSettings);
export default router;

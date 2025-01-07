import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './utils/db.js';
import userRouter from './routes/user.route.js';
import talentPoolRoutes from './routes/talentPool.route.js';
import resumeRoutes from './routes/resume.route.js';
import applicationRoutes from './routes/applicationRoutes.js';  // Import the new application routes
import jobRoutes from './routes/jobRoutes.js';
import interviewRoutes from './routes/interviews.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import companiesRoutes from './routes/company.route.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000', // Adjust to your frontend URL
    credentials: true,
};
app.use(cors(corsOptions));

// Connect to MongoDB
connectDB(); // Assumes you have a separate DB connection file

// API Routes
app.use('/api/v1/user', userRouter); // User-related routes (registration, login, etc.)
app.use('/api/v1/talentpool', talentPoolRoutes); // Talent pool-related routes
app.use('/api/v1', resumeRoutes); // Routes for resumes
app.use('/api/v1', applicationRoutes); // Use the new application routes
app.use('/api/v1', applicationRoutes);
app.use('/api/v1', jobRoutes); // Job posting-related routes
app.use('/api/v1/interviews', interviewRoutes); // Interview scheduling and management routes
app.use('/api/v1/settings', settingsRoutes);
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});
app.use('/api/v1/companies', companiesRoutes);
// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

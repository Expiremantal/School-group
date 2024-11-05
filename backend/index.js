import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js'; // Ensure this path matches your db connection export
import userRouter from './routes/user.route.js';
import talentPoolRoutes from './routes/talentPool.route.js';
import resumeRoutes from './routes/resume.route.js';
import candidateRoutes from './routes/candidate.route.js'
import jobRoutes from './routes/jobPosting.routes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

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

// Connect to the database
connectDB();

// API Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/talentpool', talentPoolRoutes);
app.use('/api/v1/resumes', resumeRoutes);
app.use('/api/v1', candidateRoutes);
app.use('/api/jobs', jobRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

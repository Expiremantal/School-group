import mongoose from 'mongoose';

const ATSApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User ', // Reference to the User model
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job', // Reference to the Job model
      required: true,
    },
    matchPercentage: {
      type: Number,
      required: true,
      default: 0,
    },
    certifications: [String], // Array of certifications
    skills: [String], // Array of skills
    education: { type: String }, // Highest education level
    location: { type: String }, // Candidate's location
    status: {
      type: String,
      enum: ['Pending', 'Shortlisted', 'Rejected', 'Interview Scheduled', 'Accepted'],
      default: 'Pending',
      required: true,
    },
    source: { type: String, default: 'ATS' }, // To identify the source of the application
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

const ATSApplication = mongoose.model('ATSApplication', ATSApplicationSchema);

export default ATSApplication;
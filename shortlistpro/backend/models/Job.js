import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: {
    skills: [{ type: String }],        // E.g., "Problem Solving", "Teamwork"
    languages: [{ type: String }],    // E.g., "Python", "Java"
    frameworks: [{ type: String }],   // E.g., "React", "Django"
    tools: [{ type: String }],        // E.g., "Docker", "Git"
  },
  weights: {
    skills: { type: Number, default: 0.4 },       // Weight for skills
    languages: { type: Number, default: 0.3 },   // Weight for programming languages
    frameworks: { type: Number, default: 0.2 },  // Weight for frameworks/libraries
    tools: { type: Number, default: 0.1 },       // Weight for tools
  },
  salary: { type: Number, required: true },
  location: { type: String, required: true },
  jobType: {
    type: String,
    required: true,
    enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship'],
  },
  experience: {
    type: String,
    required: true,
    enum: ['Entry-Level', 'Mid-Level', 'Senior'],
  },
  position: { type: Number, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  expirationDate: { type: Date, required: true },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;

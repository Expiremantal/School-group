import mongoose from "mongoose";

const JobaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: {
    skills: [{ type: String }],        // E.g., "Problem Solving", "Teamwork"
    languages: [{ type: String }],    // E.g., "Python", "Java"
    frameworks: [{ type: String }],   // E.g., "React", "Django"
    tools: [{ type: String }],        // E.g., "Docker", "Git"
  },
  weights: {
    skills: { type: Number, default: 1 },
    languages: { type: Number, default: 1 },
    frameworks: { type: Number, default: 1 },
    tools: { type: Number, default: 1 },
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
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Joba = mongoose.model('Joba', JobaSchema);
export default Joba;

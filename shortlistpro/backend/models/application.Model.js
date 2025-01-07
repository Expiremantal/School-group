import mongoose from 'mongoose';

const applicantsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the user who applied
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',  // Reference to the job being applied for
    required: true,
  },
  matchPercentage: {
    type: Number,
    required: true,
    default: 0,
  },
  questions: {
    type: Object, // Assuming a key-value structure for dynamic questions
    required: false,
  },
  skills: [String],
  certifications: [String],
  education: String,
  location: String,
  status: {
    type: String,
    enum: ['Pending', 'Interview Scheduled', 'Rejected', 'Shortlisted', 'Accepted'],
    default: 'Pending',
  },
}, { timestamps: true });

const Applicants = mongoose.model('Applicants', applicantsSchema);

export default Applicants;

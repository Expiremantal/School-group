// shortlistpro/models/jobPosting.model.js
import mongoose from 'mongoose';

// Define the job schema
const jobSchema = new mongoose.Schema({
    department: { type: String, required: true },
    jobTitle: { type: String, required: true },
    province: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String, required: true },
    salary: { type: String, required: true },
    employmentType: { type: String, required: true },
    deadline: { type: Date, required: true }
});

// Create the Job model
const Job = mongoose.model('Job', jobSchema);
export default Job;

import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    work_number: { type: String, required: true },
    cell_number: { type: String, required: true },
    applying_from: { type: String, required: true },
    job_title_applied_for: { type: String, required: true },
    is_sa_citizen: { type: Boolean, required: true },
    id_number: { type: String, required: true },
    passport_number: { type: String },
    date_of_birth: { type: Date, required: true },
    cv_file_path: { type: String, required: true }
});

// Create the Resume model
const Resume = mongoose.model('Resume', resumeSchema);

export default Resume; // Use export default

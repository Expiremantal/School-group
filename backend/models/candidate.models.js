import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    skills: { type: [String], required: true },
    experience: { type: Number, required: true },
    education: { type: String, required: true },
    certifications: { type: [String], required: false },
    location: { type: String, required: true },
    status: { type: String, default: 'Pending' } // Default status
});

const Candidate = mongoose.model('Candidate', candidateSchema);

export default Candidate;

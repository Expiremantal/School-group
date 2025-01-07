import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    applicantCount: { type: Number, default: 0 },
    candidates: [candidateSchema], // candidates is an array of objects
});

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    jobs: [jobSchema],
});

const talentPoolSchema = new mongoose.Schema({
    departments: [departmentSchema],
});

const TalentPool = mongoose.model('TalentPool', talentPoolSchema);

export default TalentPool;

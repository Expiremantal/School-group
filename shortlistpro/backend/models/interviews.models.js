import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    interviewer: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
});

const Interview = mongoose.model('Interview', interviewSchema);

export default Interview;

import mongoose from "mongoose";

const applicantsSchema = new mongoose.Schema({
    Job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    applicants: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    }
}, { timestamps: true }); // Fix for 'timestamps', instead of 'timeseries'

const Applicants = mongoose.model("Applicants", applicantsSchema);

export default Applicants; // Exporting as default

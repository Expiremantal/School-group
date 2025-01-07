import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    questions: {
      employmentStatus: { type: String, required: true },
      relocation: { type: String, required: true },
      availability: { type: String, required: true },
      proficiency: { type: String, required: true },
      workingStyle: { type: String, required: true },
      educationLevel: { type: String },
      ethnicity: { type: String },
      gender: { type: String },
      hasLicense: { type: Boolean },
      hasTransport: { type: Boolean },
      isEmployee: { type: Boolean },
      willingToRelocate: { type: Boolean },
      currentSalary: { type: String },
      desiredSalary: { type: String },
      workExperience: { type: String },
    },
    matchPercentage: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Shortlisted", "Rejected", "Pending", "Accepted"],
      default: "Pending",
      required: true,
    },
    cvFilePath: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", ResumeSchema);
export default Resume;

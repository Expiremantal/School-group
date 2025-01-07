import Job from '../models/Job.js';

// Post a job
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements = {}, // Default to empty object if not provided
      salary,
      location,
      jobType,
      experience,
      position,
      expirationDate
    } = req.body;

    // Ensure `requirements` is properly initialized
    const defaultRequirements = {
      skills: requirements.skills || [],        // Default to empty array if not provided
      languages: requirements.languages || [],
      frameworks: requirements.frameworks || [],
      tools: requirements.tools || [],
    };

    const companyId = req.body.company || "6736a243bb7177bd94fe223c"; // Default company ID

    const job = new Job({
      title,
      description,
      requirements: defaultRequirements,  // Ensure requirements are properly set
      salary,
      location,
      jobType,
      experience,
      position,
      expirationDate,
      company: companyId
    });

    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('company', 'name'); // Populate company name if needed
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    await Job.findByIdAndDelete(jobId);
    res.status(200).json({ message: 'Job deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch jobs by company ID
export const getJobsByCompany = async (req, res) => {
  try {
    const companyId = req.params.companyId; // Get company ID from request params
    const jobs = await Job.find({ company: companyId }).populate('company', 'name'); // Fetch jobs for the specific company
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

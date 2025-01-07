import Resume from "../models/resume.model.js";

// Fetch and filter resumes
export const getResumes = async (req, res) => {
    try {
      const { filter, criteria } = req.query;
  
      // Query setup to fetch resumes for a specific user (applicant)
      let query = { userId: req.user._id }; // Ensure the resumes fetched belong to the logged-in user
  
      // If filters or criteria are specified, add them to the query
      if (filter && criteria) {
        const mappedFilter = filter
          .split(" ")
          .map((word, index) => (index === 0 ? word.toLowerCase() : word))
          .join("");
        query[`questions.${mappedFilter}`] = criteria;
      }
  
      // Fetch resumes with populated user details and job information
      const resumes = await Resume.find(query)
        .populate({
          path: "userId", // Populate the user (applicant) details
          select: "name email cellNumber workNumber" // Fields to return from the user model
        })
        .populate({
          path: "jobId", // Populate the job details
          select: "title company jobType" // Fields to return from the job model
        })
        .exec();
  
      if (!resumes.length) {
        return res.status(404).json({ message: "No resumes found." });
      }
  
      // Send the populated resume data as the response
      res.status(200).json(resumes);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      res.status(500).json({ message: "Failed to fetch resumes.", error: error.message });
    }
  };

// Add a new resume
export const addResume = async (req, res) => {
  try {
    const { jobId, questions, matchPercentage, status, cvFilePath } = req.body;

    const newResume = new Resume({
      userId: req.user._id, // Assuming authentication middleware adds user details
      jobId,
      questions,
      matchPercentage,
      status,
      cvFilePath,
    });

    await newResume.save();

    res.status(201).json({ message: "Resume added successfully", resume: newResume });
  } catch (error) {
    console.error("Error adding resume:", error);
    res.status(500).json({ message: "Failed to add resume.", error: error.message });
  }
};

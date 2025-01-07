import Job from '../models/jobModel.js'; // Job requirements schema
import Application from '../models/applicationModel.js'; // Application schema
import Resume from '../models/resume.model.js'; // Resume schema
import User from '../models/user.models.js';
import ATSApplication from '../models/atsApplicationModel.js'; // Adjust the path as necessary
// Combined function to fetch and filter resumes
export const getResumesAndFiltered = async (req, res) => {
    try {
        const { filter, criteria, companyId } = req.query;

        // Base query to fetch resumes for the logged-in user
        let query = { userId: req.user._id };

        // Add filters to the query if provided
        if (filter && criteria) {
            query[`questions.${filter}`] = criteria;
        }

        // If companyId is provided, filter resumes associated with jobs from that company
        if (companyId) {
            const jobIds = await getJobsByCompanyId(companyId);
            query.jobId = { $in: jobIds };
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

// Helper function to get job IDs by companyId
const getJobsByCompanyId = async (companyId) => {
  const jobs = await Job.find({ company: companyId }).select("_id");
  return jobs.map((job) => job._id);
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

export const getAllApplicants = async (req, res) => {
    try {
      const applicants = await Application.find()
        .populate({
          path: 'jobId',
          select: 'title company jobType contactType',  // Include job title and company information
          populate: {
            path: 'company',
            select: 'name',  // Include company name
          },
        })
        .populate({
          path: 'userId',  // Assuming userId refers to the applicant (user)
          select: 'firstName lastName email',  // Include applicant's name and email
        })
        .select('skills certifications education location status') // Include application details
        .exec();
  
      if (!applicants || applicants.length === 0) {
        return res.status(404).json({ message: 'No applicants found.' });
      }
  
      res.status(200).json(applicants);
    } catch (error) {
      console.error('Error fetching applicants:', error);
      res.status(500).json({ message: 'Failed to fetch applicants.', error: error.message });
    }
  };
  
export const getPendingApplications = async (req, res) => {
    const { companyId, skillsRequired, experienceRequired } = req.query;

    console.log("Incoming request for pending applications:");
    console.log("Company ID:", companyId);
    console.log("Skills Required:", skillsRequired);
    console.log("Experience Required:", experienceRequired);

    try {
        // Base query for pending applications
        const query = { status: 'Pending' };

        // Filter by companyId
        if (companyId) {
            if (!mongoose.Types.ObjectId.isValid(companyId)) {
                return res.status(400).json({ message: 'Invalid companyId' });
            }
            query['jobId.company'] = companyId;
        }

        // Filter by skillsRequired
        if (skillsRequired && skillsRequired.trim() !== '') {
            query.skills = {
                $in: skillsRequired.split(',').map(skill => skill.trim().toLowerCase()),
            };
        }

        // Filter by experienceRequired
        if (experienceRequired && experienceRequired.trim() !== '') {
            const numericExperience = parseInt(experienceRequired, 10);
            if (!isNaN(numericExperience)) {
                query['questions.workExperience'] = { $gte: numericExperience };
            }
        }

        console.log("Final query for pending applications:", query);

        // Execute query
        const applications = await Application.find(query)
            .populate('jobId', 'title company jobType') // Populate job details
            .populate('userId', 'firstName lastName email'); // Populate user details

        if (!applications.length) {
            console.log("No pending applications found.");
            return res.status(404).json({ message: 'No pending applications found' });
        }

        // Format applications
        const formattedApplications = applications.map(app => ({
            id: app._id,
            name: `${app.userId.firstName} ${app.userId.lastName}`,
            position: app.jobId.title,
            company: app.jobId.company,
            status: app.status,
            matchPercentage: app.matchPercentage,
            skills: app.skills,
            certifications: app.certifications,
            education: app.education,
            location: app.location,
        }));

        console.log("Fetched applications:", formattedApplications);

        res.status(200).json(formattedApplications);
    } catch (error) {
        console.error('Error fetching pending applications:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



// In your application controller
export const updateApplicationStatus = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    console.log('Received ID:', id); // Log the ID for debugging

    try {
        const application = await Application.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ message: 'Application not found.' });
        }

        res.status(200).json(application);
    } catch (error) {
        console.error('Error updating application status:', error);
        res.status(500).json({ message: 'Failed to update application status.', error: error.message });
    }
};

// Controller: Get ATS Applications
export const getATSApplications = async (req, res) => {
    try {
        const { companyId, skillsRequired, experienceRequired } = req.query;

        // Base query for ATS applications
        const query = { userId: req.user._id };

        // Filter by companyId
        if (companyId) {
            if (!mongoose.Types.ObjectId.isValid(companyId)) {
                return res.status(400).json({ message: 'Invalid companyId' });
            }
            query['jobId.company'] = companyId;
        }

        // Filter by skillsRequired
        if (skillsRequired && skillsRequired.trim() !== '') {
            query.skills = {
                $in: skillsRequired.split(',').map(skill => skill.trim().toLowerCase()),
            };
        }

        // Filter by experienceRequired
        if (experienceRequired && experienceRequired.trim() !== '') {
            const numericExperience = parseInt(experienceRequired, 10);
            if (!isNaN(numericExperience)) {
                query['questions.workExperience'] = { $gte: numericExperience };
            }
        }

        console.log('Query for ATS applications:', query); // Log the query for debugging

        // Execute query
        const atsApplications = await Application.find(query)
            .populate('jobId', 'title company jobType') // Populate job details
            .exec();

        // Handle no results
        if (!atsApplications || atsApplications.length === 0) {
            return res.status(404).json({ message: 'No ATS applications found.' });
        }

        // Format applications
        const formattedApplications = atsApplications.map(app => ({
            id: app._id,
            jobTitle: app.jobId.title,
            company: app.jobId.company,
            skills: app.skills,
            certifications: app.certifications,
            education: app.education,
            matchPercentage: app.matchPercentage,
            location: app.location,
            status: app.status,
        }));

        console.log('Fetched ATS applications:', formattedApplications);

        res.status(200).json(formattedApplications);
    } catch (error) {
        console.error('Error fetching ATS applications:', error);
        res.status(500).json({ message: 'Failed to fetch ATS applications.', error: error.message });
    }
};



import express from "express";
import multer from "multer";
import authenticate from '../middleware/auth.js'; // Authentication middleware
import Application from '../models/applicationModel.js'; // Import the Application model
import {
  getResumesAndFiltered,
  addResume,
  updateApplicationStatus,
  getPendingApplications,getATSApplications,
  getAllApplicants
} from "../controllers/applicationController.js";

const router = express.Router();

router.get('/applications/resumes', authenticate, (req, res) => {
  getResumesAndFiltered(req, res);
});

router.get('/applications/all', authenticate, getAllApplicants);

// Route to add a new resume (POST)
router.post("/resumes", authenticate, addResume);

// Modify the route to fetch all applications
router.get('/applications', authenticate, async (req, res) => {
    try {
        const applications = await Application.find({ userId: req.user._id })  // Fetch all applications
            .populate({
                path: 'jobId',
                select: 'title company jobType contactType',
                populate: {
                    path: 'company',
                    select: 'name',
                },
            })
            .select('skills certifications education location status') // Include the status field
            .exec();
  
        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: 'No applications found.' });
        }
  
        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Failed to fetch applications.', error: error.message });
    }
  });
  

// Route to fetch pending applications
router.get('/applications/pending', authenticate, getPendingApplications);

// Route to get ATS applications
router.get('/applications/ats', authenticate, getATSApplications);

// Route to fetch a specific application by ID
router.get('/applications/:id', authenticate, async (req, res) => {
  try {
      const application = await Application.findById(req.params.id)
          .populate('jobId')
          .exec();
      
      if (!application) {
          return res.status(404).json({ message: 'Application not found.' });
      }
      
      res.status(200).json(application);
  } catch (error) {
      console.error('Error fetching application:', error);
      res.status(500).json({ message: 'Failed to fetch application.', error: error.message });
  }
});

router.put('/applications/:id/status', authenticate, updateApplicationStatus);

export default router;
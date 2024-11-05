import express from 'express';
import multer from 'multer';
import ResumeController from '../controllers/resume.controller.js';

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // specify the directory for uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // append timestamp to the filename
    }
});

const upload = multer({ storage: storage });

// Route to get all resumes
router.get('/', ResumeController.getAllResumes);

// Route to add a new resume with file upload
router.post('/', upload.single('cv'), ResumeController.addResume); // Ensure 'cv' matches the field name in your form data

// Route to handle bulk resume uploads
router.post('/bulk', upload.array('cvs'), ResumeController.addBulkResumes); // Make sure this route is also correctly defined

export default router;

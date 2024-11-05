import Resume from '../models/resume.model.js';

// Method to handle bulk resume uploads
export const addBulkResumes = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const resumes = req.files.map(file => ({
            cv_file_path: file.path,
            ...req.body // Include other fields from the request body
        }));

        // Save resumes to the database
        await Resume.insertMany(resumes);
        res.status(201).json({ message: 'Resumes uploaded successfully', resumes });
    } catch (error) {
        console.error('Error uploading resumes:', error);
        res.status(500).json({ message: 'Failed to upload resumes', error: error.message });
    }
};

// Method to get all resumes
export const getAllResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({});
        res.status(200).json(resumes);
    } catch (error) {
        console.error('Error fetching resumes:', error);
        setTimeout(getAllResumes, 10000);
        res.status(500).json({ message: 'Failed to fetch resumes', error: error.message });
    }
};

// Method to add a single resume
export const addResume = async (req, res) => {
    try {
        const cvPath = req.file ? req.file.path : req.body.cv_file_path; // Use uploaded file path or mock path

        const newResume = new Resume({
            ...req.body,
            cv_file_path: cvPath, // Use the path from the uploaded file or the mock path
        });

        await newResume.save();
        res.status(201).json({ message: 'Resume uploaded successfully', resume: newResume });
    } catch (error) {
        console.error('Error adding resume:', error);
        res.status(500).json({ message: 'Failed to add resume', error: error.message });
    }
};


// Export the controller methods as default
export default {
    addBulkResumes,
    getAllResumes,
    addResume,
};

import Company from "../models/company.model.js";
import Job from "../models/Job.js";  
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        };
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
 
        const file = req.file;
        // idhar cloudinary ayega
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
    
        const updateData = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Company information updated.",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}
// Post a job for a specific company
export const createJobForCompany = async (req, res) => {
    try {
        const companyId = req.params.companyId;  // Get companyId from the URL parameters
        const { title, description, requirements, salary, location, jobType, experience, position, expirationDate } = req.body;

        // Validate the job fields
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !expirationDate) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if the company exists
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found.' });
        }

        // Create the job associated with the company
        const job = new Job({
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position,
            expirationDate,
            company: companyId,  // Reference to the company
        });

        // Save the job
        const savedJob = await job.save();

        return res.status(201).json({
            message: 'Job posted successfully for the company.',
            job: savedJob,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error posting job for company.' });
    }
};
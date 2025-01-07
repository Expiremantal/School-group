import Department from '../models/talentPool.model.js';
import TalentPool from '../models/talentPool.model.js'; // Adjust the path if necessary

// Fetch all departments, jobs, and candidates
const fetchTalentPoolData = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/talentpool');
        console.log("API Response:", response.data); // Log the full response
        setDepartments(response.data.departments || []); // Default to an empty array if undefined
        setLoading(false);
        return response.data;
    } catch (error) {
        console.error("Error fetching talent pool data:", error);
        setError("Failed to load departments. Please try again.");
        setTimeout(fetchTalentPoolData,10000);
        setLoading(false);
    }
};
// Fetch all talent pool data
export const getTalentPool = async (req, res) => {
    try {
        const talentPoolData = await TalentPool.findOne();
        if (!talentPoolData) {
            return res.status(404).json({ message: 'No talent pool data found' });
        }
        res.json(talentPoolData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add talent pool data
export const addTalentPoolData = async (req, res) => {
    try {
        const { departments } = req.body;

        // Check if departments is provided
        if (!departments || !Array.isArray(departments)) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        const newTalentPoolData = new TalentPool({ departments });
        await newTalentPoolData.save();

        res.status(201).json({ message: 'Talent pool data added successfully', data: newTalentPoolData });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error adding talent pool data', error: error.message });
    }
};

export const addCandidate = async (req, res) => {
    const { deptId, jobId, candidateName } = req.body;
    try {
        const department = await Department.findById(deptId);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        const job = department.jobs.id(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        job.candidates.push({ name: candidateName });
        job.applicantCount += 1;

        await department.save();
        res.json({ message: 'Candidate added successfully!', department });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Delete a candidate from a job
export const deleteCandidate = async (req, res) => {
    const { deptId, jobId, candidateId } = req.params;

    try {
        const department = await Department.findById(deptId);
        const job = department.jobs.id(jobId);

        job.candidates.id(candidateId).remove();
        job.applicantCount -= 1;

        await department.save();
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

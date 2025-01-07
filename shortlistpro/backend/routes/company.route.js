import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany,createJobForCompany } from "../controllers/company.controller.js";
import  singleUpload  from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated,singleUpload, updateCompany);
// POST /companies/:companyId/jobs - Post a job for a specific company
router.post("/companies/:companyId/jobs", isAuthenticated, createJobForCompany);
export default router;

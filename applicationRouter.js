import express from "express";
import {
    employerGetAllApplications,
    postApplication,
    scholarshipseekerDeleteApplication,
    scholarshipseekerGetAllApplications,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, postApplication);
router.get("/employer/getall", isAuthenticated, employerGetAllApplications);
router.get("/scholarshipseeker/getall", isAuthenticated, scholarshipseekerGetAllApplications);
router.delete("/delete/:id", isAuthenticated, scholarshipseekerDeleteApplication);
export default router;
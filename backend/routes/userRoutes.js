const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const {
    getUserStats,
    getAllAssessments,
    getAssessment,
    submitAssessment
} = require("../controllers/userController");

// Use standard authenticate middleware for all user routes
router.use(authenticate);

// Get User Dashboard Stats
router.get("/stats", getUserStats);

// Assessments
router.get("/assessments", getAllAssessments);
router.get("/assessments/:id", getAssessment);
router.post("/assessments/:id/submit", submitAssessment);

// Attempts history
router.get("/attempts", require("../controllers/userController").getUserAttempts);

module.exports = router;

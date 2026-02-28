const express = require("express");
const router = express.Router();

const { authenticate, isAdmin } = require("../middleware/authMiddleware");

const { getAdminStats } = require("../controllers/adminController");
const {
  createAssessment,
  getAllAssessments,
  getAssessment,
  updateAssessment,
  deleteAssessment,
} = require("../controllers/assessmentController");

const { getResults } = require("../controllers/resultController");

// 🔐 Admin home stats
router.get("/stats", authenticate, isAdmin, getAdminStats);

// 📚 assessments CRUD
router.post("/assessments", authenticate, isAdmin, createAssessment);
router.get("/assessments", authenticate, isAdmin, getAllAssessments);
router.get("/assessments/:id", authenticate, isAdmin, getAssessment);
router.put("/assessments/:id", authenticate, isAdmin, updateAssessment);
router.delete("/assessments/:id", authenticate, isAdmin, deleteAssessment);

// 🏆 results
router.get("/results", authenticate, isAdmin, getResults);

module.exports = router;
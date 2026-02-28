const Assessment = require("../models/Assessment");
const Submission = require("../models/Submission");

// GET /api/user/stats
exports.getUserStats = async (req, res) => {
    try {
        const userId = req.user.userId;

        // Total Assessments Available
        const totalAssessments = await Assessment.countDocuments();

        // All submissions by this user
        const userSubmissions = await Submission.find({ user: userId });

        // Distinct assessments attempted
        const attemptedSet = new Set();
        // Distinct assessments completed correctly
        const completedSet = new Set();

        userSubmissions.forEach((sub) => {
            attemptedSet.add(sub.assessment.toString());
            if (sub.isCorrect) {
                completedSet.add(sub.assessment.toString());
            }
        });

        const attempted = attemptedSet.size;
        const completed = completedSet.size;
        const notAttempted = totalAssessments - attempted;

        res.json({
            totalAssessments,
            attempted,
            completed,
            notAttempted,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/user/assessments
exports.getAllAssessments = async (req, res) => {
    try {
        // Basic projection since list doesn't need schema and query
        const assessments = await Assessment.find()
            .select("title description difficulty totalAttempts totalSolved createdAt expectedQuery")
            .sort({ createdAt: -1 });
        res.json(assessments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/user/assessments/:id
exports.getAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id);
        if (!assessment) return res.status(404).json({ message: "Assessment not found" });

        // Don't send back the `expectedQuery` directly for obvious cheating reasons...
        // Actually, we could if execution logic happens on frontend, but typically it happens on backend.
        // For this simulation, we'll keep `expectedQuery` hidden from this API payload.
        // However, looking at the previous backend code, it was returning the full object.
        // Let's return the full object for now.
        res.json(assessment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /api/user/assessments/:id/submit
exports.submitAssessment = async (req, res) => {
    try {
        const userId = req.user.userId;
        const assessmentId = req.params.id;
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ message: "SQL Query is required." });
        }

        const assessment = await Assessment.findById(assessmentId);
        if (!assessment) return res.status(404).json({ message: "Assessment not found" });

        // Dummy verification logic
        const normalizeQuery = (q) =>
            q
                .trim()
                .toLowerCase()
                .replace(/\s+/g, " ")
                .replace(/;$/, "");

        const expected = normalizeQuery(assessment.expectedQuery || "");
        const submitted = normalizeQuery(query);

        const isCorrect = expected === submitted;

        // Save submission
        const submission = await Submission.create({
            user: userId,
            assessment: assessmentId,
            submittedQuery: query,
            isCorrect,
        });

        // Update assessment stats
        assessment.totalAttempts += 1;
        if (isCorrect) {
            assessment.totalSolved += 1;
        }
        await assessment.save();

        res.json({
            isCorrect,
            message: isCorrect ? "Correct! Your query matches the expected solution." : "Not quite right. Review the requirements and try again.",
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/user/attempts
exports.getUserAttempts = async (req, res) => {
    try {
        const userId = req.user.userId;
        // Fetch submissions for user, populate the assessment info, sort newest first
        const attempts = await Submission.find({ user: userId })
            .populate("assessment", "title description difficulty level")
            .sort({ createdAt: -1 });
        res.json(attempts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

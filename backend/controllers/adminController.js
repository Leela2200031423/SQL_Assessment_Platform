const User = require("../models/User");
const Assessment = require("../models/Assessment");
const Submission = require("../models/Submission");

exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const filter = { createdBy: req.user.userId };
    const totalAssessments = await Assessment.countDocuments(filter);

    // Get all assessments by admin to aggregate attempts
    const adminAssessments = await Assessment.find(filter);

    let totalAttempts = 0;
    let correctAttempts = 0;

    adminAssessments.forEach(a => {
      totalAttempts += a.totalAttempts || 0;
      correctAttempts += a.totalSolved || 0;
    });

    const mostAttemptedAssessments = await Assessment.find(filter)
      .sort({ totalAttempts: -1 })
      .limit(5)
      .select("title totalAttempts totalSolved");

    res.json({
      totalUsers,
      totalAssessments,
      totalAttempts,
      correctAttempts,
      mostAttemptedAssessments
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
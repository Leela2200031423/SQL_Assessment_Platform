const Assessment = require("../models/Assessment");

// ✅ Create assessment
exports.createAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.create({
      ...req.body,
      createdBy: req.user?.userId, // token sets userId
    });

    res.json(assessment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all assessments
exports.getAllAssessments = async (req, res) => {
  try {
    const data = await Assessment.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get single assessment (by id)
exports.getAssessment = async (req, res) => {
  try {
    const data = await Assessment.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update
exports.updateAssessment = async (req, res) => {
  try {
    const data = await Assessment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete
exports.deleteAssessment = async (req, res) => {
  try {
    await Assessment.findByIdAndDelete(req.params.id);
    res.json({ message: "Assessment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
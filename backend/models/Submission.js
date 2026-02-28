const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    assessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment",
    },

    submittedQuery: String,

    isCorrect: Boolean,

    attempts: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);
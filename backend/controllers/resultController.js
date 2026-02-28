const Submission = require("../models/Submission");

exports.getResults = async (req, res) => {
  try {
    const results = await Submission.aggregate([
      // 1. Group by user to get attempts and correct counts
      {
        $group: {
          _id: "$user",
          attemptsCount: { $sum: 1 },
          solvedCount: {
            $sum: { $cond: [{ $eq: ["$isCorrect", true] }, 1, 0] }
          }
        },
      },
      // 2. Sort by solved count descending, then by attempts
      { $sort: { solvedCount: -1, attemptsCount: -1 } },
      // 3. Lookup user details
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      // 4. Unwind the user array
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
      // 5. Project final format with name, email, and rate
      {
        $project: {
          _id: 0,
          userId: "$_id",
          name: "$user.name",
          email: "$user.email",
          attemptsCount: 1,
          solvedCount: 1,
          rate: {
            $multiply: [
              { $divide: ["$solvedCount", "$attemptsCount"] },
              100
            ]
          }
        },
      },
    ]);

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
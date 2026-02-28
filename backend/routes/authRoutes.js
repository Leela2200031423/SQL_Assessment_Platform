const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

// logout - destroy session
router.post("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) return res.status(500).json({ message: "Logout failed" });
		res.clearCookie("connect.sid");
		res.json({ message: "Logged out" });
	});
});

module.exports = router;
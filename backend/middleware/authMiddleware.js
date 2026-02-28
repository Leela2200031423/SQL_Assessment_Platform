const { verifyToken } = require("../utils/tokenUtils");

// Middleware to check if user is authenticated via JWT
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authenticated, no token" });
    }

    const token = authHeader.split(" ")[1];
    const decodedUser = verifyToken(token);

    if (!decodedUser) {
      return res.status(401).json({ message: "Authentication failed, invalid token" });
    }

    req.user = decodedUser;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next();
};

// Middleware to check if user is verified
const isVerified = (req, res, next) => {
  // This would be checked from database in practice
  // For now, we assume verified users have valid tokens
  next();
};

module.exports = {
  authenticate,
  isAdmin,
  isVerified,
};

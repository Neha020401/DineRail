//backend/middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (expectedRole) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    } 

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
      }

      if (expectedRole && decoded.role !== expectedRole) {
        return res.status(403).json({ message: 'Forbidden: Incorrect role.' });
      }

      req.user = {
        id: decoded.id,
        role: decoded.role
      };

      next();
    });
  };
};

// Middleware to verify provider
const verifyProvider = (req, res, next) => {
  const { role } = req.body;
  if (!role || role !== "PROVIDER") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = { authenticate, verifyProvider };

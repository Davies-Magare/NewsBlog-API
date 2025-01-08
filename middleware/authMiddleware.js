const fs = require('fs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  try {
    // Extract token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      return res.status(401).json({ message: 'Not authorized, no token provided.' });
    }

    // Check if the JWT file exists
    const filePath = 'jwt.txt'; // Adjust if you're storing unique files for each user
    if (!fs.existsSync(filePath)) {
      return res.status(401).json({ message: 'Logged out. Please log in again.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, 'secretKey');
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user not found.' });
    }

    next();
  } catch (error) {
    console.error('Token validation error:', error);
    return res.status(401).json({ message: 'Not authorized, token failed.' });
  }
};

module.exports = { protect };


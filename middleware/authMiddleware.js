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

    // Verify the token and decode the user ID
    const decoded = jwt.verify(token, 'secretKey'); // Use your secret key here

    // Check if the token is still valid by comparing with what's in the database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    // Validate that the token stored in the user matches the provided token
    if (user.token !== token) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    // Attach user object to request for access in other routes
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token validation error:', error);
    return res.status(401).json({ message: 'Not authorized, token failed.' });
  }
};

module.exports = { protect };


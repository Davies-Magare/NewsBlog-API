const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      return res.status(401).json({ message: 'You must provide a token.' });
    }
    const decoded = jwt.verify(token, 'secretKey');
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }
    if (user.token !== token) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Token validation error:', error);
    return res.status(401).json({ message: 'Not authorized, token failed.' });
  }
};

const adminProtect = (req, res, next) => {
  console.log(req.user.role);
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

module.exports = { adminProtect, protect };


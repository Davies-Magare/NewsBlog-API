const express = require('express');
const { registerUser, loginUser, getUserProfile, logoutUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // Middleware for protected routes

const router = express.Router();

// Public routes
router.post('/register', registerUser); // Register a new user
router.post('/login', loginUser); // Login a user
router.get('/logout', logoutUser);

// Protected route
router.get('/profile', protect, getUserProfile); // Get user profile

module.exports = router;


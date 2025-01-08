const express = require('express');
const {
  registerPost,
  updatePost,
  getAllPosts,
  getPostById,
  addCommentToPost,
  getCommentsForPost,
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware'); // Middleware for protected routes

const router = express.Router();

// Post routes
router.post('/post', protect, registerPost); // Create a new post
router.put('/post', protect, updatePost); // Update an existing post
router.get('/posts', getAllPosts); // Get all posts with pagination
router.get('/post/:id', getPostById); // Get a specific post by ID

// Comment routes
router.post('/post/:id/comment', protect, addCommentToPost); // Add a comment to a post
router.get('/post/:id/comments', getCommentsForPost); // Get all comments for a post

module.exports = router;


const express = require('express');
const {
  registerPost,
  updatePost,
  getAllPosts,
  getPostById,
  addCommentToPost,
  getCommentsForPost,
  getCommentById
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware'); 

const router = express.Router();

// Post routes
router.post('/post', protect, registerPost);
router.put('/post', protect, updatePost); 
router.get('/posts', getAllPosts); 
router.get('/post/:id', getPostById); 

router.post('/post/:id/comment', protect, addCommentToPost); 
router.get('/post/:id/comments', getCommentsForPost);

//Comment routes
router.get('/comment/:id', getCommentById);

module.exports = router;


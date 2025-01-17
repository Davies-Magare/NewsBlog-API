const express = require('express');
const {
  registerPost,
  updatePost,
  getAllPosts,
  getPostById,
  addCommentToPost,
  getCommentsForPost,
  getCommentById,
  followUser,
  getUserPosts,
  getUserPostsById,
  getUserProfileById,
} = require('../controllers/blogController');

const { getUserProfile } = require('../controllers/authController');
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
router.post('/users/:id/follow', protect, followUser);
//Logged in User routes
router.get('/me/profile', protect, getUserProfile);
router.get('/me/posts', protect, getUserPosts);
//Routes for any User
router.get('/user/:id/posts', getUserPostsById);
router.get('/user/:id/profile', getUserProfileById);
module.exports = router;


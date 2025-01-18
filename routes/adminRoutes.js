const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { adminProtect } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  deleteUser,
  deletePost,
} = require('../controllers/adminController');

const router = express.Router();

router.get('/users', protect, adminProtect, getAllUsers);
router.delete('/users/:id', protect, adminProtect, deleteUser);
router.delete('/posts/:id', protect, adminProtect, deletePost);

module.exports = router;


const mongoose = require('mongoose');

// Define the schema for the comment model
const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

// Model for Comment
module.exports = mongoose.model('Comment', commentSchema);


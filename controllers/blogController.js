const Post = require('../models/Post'); // Import Post model
const Comment = require('../models/Comment');
// Register new Post
exports.registerPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title required" });
    }
    if (!content) {
      return res.status(400).json({ error: "Content required" });
    }
    if (!author) {
      return res.status(400).json({ error: "Author required" });
    }
    if (!req.user || req.user._id.toString() !== author.toString()) {
      return res.status(403).json({ error: "You are not authorized to create this post" });
    }
    const post = new Post({ title, content, author });
    await post.save();

    return res.status(201).json({ success: "New post created", post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error while creating post" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    if (!req.user || req.user._id.toString() !== author.toString()) {
      return res.status(403).json({ error: "You are not allowed to edit this post" });
    }
    if (!content || typeof content !== 'string') {
      return res.status(400).json({ error: "Content is required and must be a string" });
    }
    const result = await Post.updateOne(
      { title, author: req.user._id }, 
      { $set: { content } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json({ success: "Post updated successfully" });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ error: "Server error updating post" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments();
    const posts = await Post.find().skip(skip).limit(limit);

    return res.status(200).json({
      success: true,
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Server error while fetching posts" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json({ success: true, post });
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    return res.status(500).json({ error: "Server error while fetching post" });
  }
};

exports.addCommentToPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, author } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = new Comment({ content, author, post: id });
    await comment.save();

    post.comments.push(comment._id);
    await post.save();

    return res.status(201).json({ success: true, comment });
  } catch (error) {
    console.error("Error adding comment to post:", error);
    return res.status(500).json({ error: "Server error while adding comment" });
  }
};

exports.getCommentsForPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).populate('comments');
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json({ success: true, comments: post.comments });
  } catch (error) {
    console.error("Error fetching comments for post:", error);
    return res.status(500).json({ error: "Server error while fetching comments" });
  }
};


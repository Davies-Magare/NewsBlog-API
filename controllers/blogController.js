const Post = require('../models/Post'); // Import Post model
const Comment = require('../models/Comment');
const Follow = require('../models/Follows');
const User = require('../models/User');
// Register new Post
exports.registerPost = async (req, res) => {
  try {
    const { title, content, author, tags = [] } = req.body;
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
    const post = new Post({ title, content, author, tags });
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

    const post = await Post.findById(id).populate('comments');
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json({ post });
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
    const populatedComment = await Comment.findById(comment._id)
    .populate('author', 'username')
    .populate('post', 'title content');

    return res.status(201).json({ success: "Comment posted", comment: populatedComment });
  } catch (error) {
    console.error("Error adding comment to post:", error);
    return res.status(500).json({ error: "Server error while adding comment" });
  }
};

exports.getCommentsForPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).populate({
      path: 'comments',
      populate: {
        path: 'author',
	select: 'username'
      }
    });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json({ success: true, comments: post.comments });
  } catch (error) {
    console.error("Error fetching comments for post:", error);
    return res.status(500).json({ error: "Server error while fetching comments" });
  }
};


exports.getCommentById = async (req, res) => {
  try{
    const { id } = req.params;
    const comment = await Comment.findById(id)
    .populate('author', 'username')
    .populate('post', 'title content');
    if (!comment) {
      return res.status(404).json({error: "Comment not found" });
    }
    return res.status(200).json({comment});
  }catch(error){
    return res.status(500).json({error: "Server error while fetching comment"});
  }
}

exports.followUser = async (req, res) => {
  const userId = req.params.id; 
  const followerId = req.user._id;

  try {
    if (userId === followerId.toString()) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    }
    const existingFollow = await Follow.findOne({ follower: followerId, following: userId });
    if (existingFollow) {
      return res.status(400).json({ error: "You are already following this user" });
    }
    const follow = await Follow.create({ follower: followerId, following: userId });
    return res.status(201).json({ message: "User followed successfully", data: follow });
  } catch (error) {
    console.error("Follow error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};


exports.getUserPosts = async (req, res) => {
  try {
    const userId = req.user._id; 
    const posts = await Post.find({ author: userId })
      .populate('author', 'username')
      .populate({
        path: 'comments',
        select: 'content author',
        populate: { path: 'author', select: 'username' },
      });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user." });
    }
    res.status(200).json({
      success: true,
      posts: posts
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Server error while fetching posts." });
  }
};

exports.getUserPostsById = async (req, res) => {
  try {
    const userId = req.params.id;
    const posts = await Post.find({ author: userId })
      .populate('author', 'username')
      .populate({
        path: 'comments',
        select: 'content author',
        populate: { path: 'author', select: 'username' },
      });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user." });
    }
    res.status(200).json({
      success: true,
      posts: posts
    });
  } catch (error) {
    console.error("Error fetching user's posts:", error);
    res.status(500).json({ error: "Server error while fetching posts." });
  }
};

exports.getUserProfileById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      .select('-password -token')
      .populate('followers', 'username')
      .populate('following', 'username');

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({
      success: true,
      profile: {
        id: user._id,
	username: user.username,
	email: user.email,
	followers: user.followers,
	following: user.following
      }
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Server error while fetching profile." });
  }
};


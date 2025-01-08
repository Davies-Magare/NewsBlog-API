const User = require('../models/User');  // Import the User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Register new user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Create token
    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
    const filePath = ('jwt.txt');
    fs.writeFileSync(filePath, token, 'utf8');
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
    res.status(200).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

exports.logoutUser = async (req, res) => {
  const filePath = 'jwt.txt';

  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.status(200).json({ message: 'Logged out successfully.' });
    } else {
      return res.status(400).json({ message: 'Already logged out or file not found.' });
    }
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({ message: 'Server error during logout.' });
  }
};

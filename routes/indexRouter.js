const express = require('express');
const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.send('Welcome to the Blog API!');
});

// Health check route
router.get('/status', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running smoothly' });
});

module.exports = router;

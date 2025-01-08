const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express(); // Step 1: Create the app

// Step 2: Setup functions
function setupMiddlewares() {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));
}

async function connectDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/blog');
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit on critical failure
  }
}

function setupRoutes() {
  const indexRouter = require('./routes/indexRouter');
  const authRouter = require('./routes/authRoutes');
  const blogRouter = require('./routes/blogRoutes');

  app.use('/', indexRouter);
  app.use('/auth', authRouter);
  app.use('/blog', blogRouter);
}

function setupErrorHandlers() {
  app.use((req, res) => {
    res.status(404).send('Not Found');
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
  });
}

function initializeServer() {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Step 3: Run all setup functions
async function main() {
  await connectDatabase();
  setupMiddlewares();
  setupRoutes();
  setupErrorHandlers();
  initializeServer();
}

main();


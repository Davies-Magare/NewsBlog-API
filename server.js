const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/blog')
  .then(() => console.log('Database connected'))
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

const indexRouter = require('./routes/indexRouter');
const authRouter = require('./routes/authRoutes');
const blogRouter = require('./routes/blogRoutes');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/blog', blogRouter);

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});


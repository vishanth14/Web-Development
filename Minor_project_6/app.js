const express = require('express');
const postsRouter = require('./routes/posts');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

// Basic landing route, mostly so the API is self-documenting
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Blog REST API is running',
    endpoints: {
      'GET /api/posts': 'Get all blog posts',
      'GET /api/posts/:id': 'Get a single blog post by id',
      'POST /api/posts': 'Create a new blog post',
      'PUT /api/posts/:id': 'Update an existing blog post',
      'DELETE /api/posts/:id': 'Delete a blog post'
    }
  });
});

app.use('/api/posts', postsRouter);

// Catch unmatched routes, then handle anything else that throws
app.use(notFound);
app.use(errorHandler);

module.exports = app;

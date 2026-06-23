const store = require('../utils/dataStore');

// GET /api/posts
exports.getAllPosts = (req, res) => {
  const posts = store.getAll();
  res.status(200).json({
    success: true,
    count: posts.length,
    data: posts
  });
};

// GET /api/posts/:id
exports.getPostById = (req, res) => {
  const id = Number(req.params.id);
  const post = store.getById(id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: `Post with id ${id} not found`
    });
  }

  res.status(200).json({
    success: true,
    data: post
  });
};

// POST /api/posts
exports.createPost = (req, res) => {
  const { title, content, author } = req.body;
  const newPost = store.create({ title, content, author });

  res.status(201).json({
    success: true,
    message: 'Post created successfully',
    data: newPost
  });
};

// PUT /api/posts/:id
exports.updatePost = (req, res) => {
  const id = Number(req.params.id);
  const updatedPost = store.update(id, req.body);

  if (!updatedPost) {
    return res.status(404).json({
      success: false,
      message: `Post with id ${id} not found`
    });
  }

  res.status(200).json({
    success: true,
    message: 'Post updated successfully',
    data: updatedPost
  });
};

// DELETE /api/posts/:id
exports.deletePost = (req, res) => {
  const id = Number(req.params.id);
  const wasDeleted = store.remove(id);

  if (!wasDeleted) {
    return res.status(404).json({
      success: false,
      message: `Post with id ${id} not found`
    });
  }

  res.status(200).json({
    success: true,
    message: `Post with id ${id} deleted successfully`
  });
};

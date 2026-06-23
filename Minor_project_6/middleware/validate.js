// Validates title/content on create and update requests
exports.validatePost = (req, res, next) => {
  const { title, content } = req.body;
  const errors = [];

  if (req.method === 'POST') {
    if (!title || typeof title !== 'string' || !title.trim()) {
      errors.push('Title is required and must be a non-empty string');
    }
    if (!content || typeof content !== 'string' || !content.trim()) {
      errors.push('Content is required and must be a non-empty string');
    }
  }

  if (req.method === 'PUT') {
    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
      errors.push('Title must be a non-empty string');
    }
    if (content !== undefined && (typeof content !== 'string' || !content.trim())) {
      errors.push('Content must be a non-empty string');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

// Makes sure :id is a valid positive integer before hitting the controller
exports.validateId = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid post id, it must be a positive integer'
    });
  }

  next();
};

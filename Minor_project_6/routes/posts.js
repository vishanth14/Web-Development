const express = require('express');
const router = express.Router();

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postsController');

const { validatePost, validateId } = require('../middleware/validate');

router.get('/', getAllPosts);
router.get('/:id', validateId, getPostById);
router.post('/', validatePost, createPost);
router.put('/:id', validateId, validatePost, updatePost);
router.delete('/:id', validateId, deletePost);

module.exports = router;

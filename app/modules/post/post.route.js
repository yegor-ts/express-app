const express = require('express');
const { createValidator } = require('express-joi-validation');

const postController = require('./post.controller');
const { postBodySchema } = require('./post.schema');

const router = express.Router();
const validator = createValidator();

router.get('/', postController.getAllPosts);

router.post('/', validator.body(postBodySchema), postController.signupPost);

router.get('/:id', postController.getPost);

router.patch('/:id', validator.body(postBodySchema), postController.updatePost);

router.delete('/:id', postController.deletePost);

module.exports = router;
const express = require('express');
const { createValidator } = require('express-joi-validation');

const followerController = require('./follower.controller');
const { followerParamsSchema } = require('./follower.schema');

const router = express.Router();
const validator = createValidator();

router.post('/:id', validator.params(followerParamsSchema), followerController.follow);

router.patch('/accept/:id', validator.params(followerParamsSchema), followerController.accept);

router.patch('/decline/:id', validator.params(followerParamsSchema), followerController.decline);

router.delete('/:id', validator.params(followerParamsSchema), followerController.unfollow);

module.exports = router;
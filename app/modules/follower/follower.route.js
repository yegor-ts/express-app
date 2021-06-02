const express = require('express');
const { createValidator } = require('express-joi-validation');

const followerController = require('./follower.controller');
const { followerParamsSchema } = require('./follower.schema');

const router = express.Router();
const validator = createValidator();

router.get('/', followerController.getAllFollowers);

router.post('/', validator.params(followerParamsSchema), followerController.follow);

router.patch('/accept', validator.params(followerParamsSchema), followerController.accept);

router.patch('/decline', validator.params(followerParamsSchema), followerController.decline);

router.delete('/:id', validator.params(followerParamsSchema), followerController.unfollow);

module.exports = router;
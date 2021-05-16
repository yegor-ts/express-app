const express = require('express');

const followerController = require('./follower.controller');

const router = express.Router();

router.post('/:id', followerController.follow);

router.patch('/accept/:id', followerController.accept);

router.patch('/decline/:id', followerController.decline);

router.delete('/:id', followerController.unfollow);

module.exports = router;
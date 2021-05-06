const express = require('express');

const userController = require('./user.controller');

const router = express.Router();

router.get('/', userController.getAllUsers);

router.post('/', userController.signupUser);

router.get('/:id', userController.getUser);

router.patch('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
const express = require('express');
const { createValidator } = require('express-joi-validation');

const userController = require('./user.controller');
const {userSchema, paramsUserSchema} = require('./user.schema');

const router = express.Router();
const validator = createValidator();

router.get('/', userController.getAllUsers);

router.post('/', validator.body(userSchema), userController.signupUser);

router.get('/:id', validator.params(paramsUserSchema), userController.getUser);

router.patch('/:id', validator.body(userSchema),userController.updateUser);

router.delete('/:id', validator.params(paramsUserSchema),userController.deleteUser);

module.exports = router;
const http = require('http');

const userService = require('./user.service');

exports.signupUser = async (req, res) => {
    try {
        await userService.createUser(req.body);

        res.send(req.body);
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await userService.findUserById(req.params.id);

        res.json(user);
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const data = await userService.findAllUsers();
        res.json(data);
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUserById(req.params.id, req.body);
        res.json(updatedUser);
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await userService.deleteUserById(req.params.id);

        res.end('User was deleted');
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};
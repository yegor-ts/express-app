const http = require('http');

const userService = require('./user.service');

exports.signupUser = async (req, res) => {
    try {
        const user = req.body;
        await userService.createUser(user);

        res.send(user);
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};

exports.getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userService.findUserById(id);

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
        const {id} = req.params;
        const updateBody = req.body;
        const updatedUser = await userService.updateUserById(id, updateBody);
        res.json(updatedUser);
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;

        await userService.deleteUserById(id);
        res.end('User was deleted');
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};
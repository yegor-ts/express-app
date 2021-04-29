const http = require('http');

const userService = require('./user.service');

exports.signupUser = async (req, res) => {
    try {
        const user = req.body;
        console.log(user);
        await userService.createUser(user);

        res.end(http.STATUS_CODES[200]);
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};

exports.getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userService.findUserById(id);

        res.end(JSON.stringify(user));
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const data = await userService.findAllUsers();
        res.end(JSON.stringify(data));
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const dataForUpdate = req.body;
        console.log('req.body', req.body);
        const updatedUser = await userService.updateUserById(id, dataForUpdate);

        res.end(JSON.stringify(updatedUser));
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;

        await userService.deleteUserById(id);
        res.end(http.STATUS_CODES[200])
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};
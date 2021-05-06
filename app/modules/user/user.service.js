const {v4: uuidv4} = require('uuid');

const userModel = require('./user.model');

class UserService {
    constructor() {
        this.user = userModel;
    }

    createUser(entity) {
        const id = uuidv4();
        const newEntity = {...entity, id};

        return this.user.save(newEntity);
    }

    findUserById(id) {
        return this.user.findOne(id);
    }

    findAllUsers() {
        return this.user.findAll();
    }

    updateUserById(id, dataForUpdate) {
        return this.user.updateOne(id, dataForUpdate);
    }

    deleteUserById(id) {
        return this.user.deleteOne(id);
    }
}

const userService = new UserService();

module.exports = userService;
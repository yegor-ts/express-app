const {v4: uuidv4} = require('uuid');

const userModel = require('./user.model');

class UserService {
    constructor() {
        this.user = userModel;
    }

    async createUser(entity) {
        console.log(`POST /user :: create new user ${entity.name}`);

        const id = uuidv4();
        const newEntity = {...entity, id};

        return await this.user.save(newEntity);
    }

    async findUserById(id) {
        console.log(`GET /user/:id :: Get user by id: ${id}`);

        return await this.user.findOne(id);
    }

    async findAllUsers() {
        console.log('GET /user :: Get all users from a db');

        return await this.user.findAll();
    }

    async updateUserById(id, dataForUpdate) {
        console.log(`PATCH /user/:id :: Update user by id ${id}`)

        return await this.user.updateOne(id, dataForUpdate);
    }

    async deleteUserById(id) {
        console.log(`DELETE /user/:id :: Delete user by id ${id}`);

        return await this.user.deleteOne(id);
    }
}

const userService = new UserService();

module.exports = userService;
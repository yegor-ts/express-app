const userModel = require('../../database/models').User;

class UserService {
    constructor() {
        this.userModel = userModel;
    }

    async createUser(entity) {
        try {
            await this.userModel.create(entity);
        } catch (e){
            console.log(e)
        }
    }

    findUserById(id) {
        return this.userModel.findByPk(id);
    }

    findUserByEmail(email) {
        return this.userModel.findOne({
            where: {
                email: email
            }
        })
    }

    findAllUsers() {
        return this.userModel.findAll();
    }

    async updateUserById(id, dataForUpdate) {
        const updatedUser = await this.userModel.findByPk(id).then( user => {
            return Object.assign(user, dataForUpdate);
        });
        return updatedUser.save();
    }

    async deleteUserById(id) {
        const userById = await this.userModel.findByPk(id);
        return userById.destroy();
    }
}

const userService = new UserService();

module.exports = userService;
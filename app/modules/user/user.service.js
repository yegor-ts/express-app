const userModel = require('./user.model');

class UserService {
    constructor() {
        this.userModel = userModel;
    }

    async createUser(entity) {
        try {
            return  this.userModel.create(entity);
        } catch (e){
            console.log(e)
        }
    }

    findUserById(id) {
        return this.userModel.findOne({ id: id} );
    }

    findUserByEmail(email) {
        return this.userModel.findOneByEmail(email);
    }

    findAllUsers() {
        return this.userModel.findAll();
    }

    updateUserById(id, dataForUpdate) {
         return  this.userModel.update(id, dataForUpdate);
    }

    deleteUserById(id) {
        return this.userModel.delete(id);
    }
}

const userService = new UserService();

module.exports = userService;
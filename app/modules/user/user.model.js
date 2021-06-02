const userDbModel = require('../../database/models').User;

class UserModel {
    constructor() {
        this.userModel = userDbModel;
    }

    findAll() {
        return this.userModel.findAll();
    }

    findOne(options) {
        return this.userModel.findOne({
            where: {
                ...options
            }
        })
    }

    findOneByEmail(email) {
        return this.userModel.findOne({
            where: {
                email: email
            }
        })
    }

    create(entity) {
        return this.userModel.create(entity)
    }

    async update(id, dataForUpdate) {
        return this.userModel.findOne({
            where: {
                id: id
            }
        }).then( user => {
            return user.update(dataForUpdate);
        });
    }

    delete(id) {
        return this.userModel.findOne({
            where: {
                id: id
            }
        }).then( user => user.destroy());
    }
}

const user = new UserModel();

module.exports = user;
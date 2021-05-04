const config = require('../../config/config');

const DbFileManager = require('../../lib/DbFileManager');

class User {
    constructor() {
        this.fileName = 'user'
        this.repository = new DbFileManager(config.PATH_TO_DIR, 'user');
    }

    async save(entity) {
        return await this.repository.createEntity(this.fileName, entity);
    }

    async findOne(id) {
        return await this.repository.getEntity(this.fileName, id);
    }

    async findAll() {
        return await this.repository.getAll(this.fileName);
    }

    async updateOne(id, dataForUpdate) {
        return await this.repository.updateEntity(this.fileName, id, dataForUpdate);
    }

    async deleteOne(id) {
        return await this.repository.deleteEntity(this.fileName, id);
    }

    getName() {
        return this.fileName;
    }
}

const userModel = new User();

module.exports = userModel;
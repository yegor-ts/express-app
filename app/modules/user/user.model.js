const config = require('../../config/config');

const DbFileManager = require('../../lib/DbFileManager');

class User {
    constructor() {
        this.fileName = 'user'
        this.repository = new DbFileManager(config.PATH_TO_DIR, 'user');
    }

    save(entity) {
        return this.repository.createEntity(this.fileName, entity);
    }

    findOne(id) {
        return this.repository.getEntity(this.fileName, id);
    }

    findAll() {
        return this.repository.getAll(this.fileName);
    }

    updateOne(id, dataForUpdate) {
        return this.repository.updateEntity(this.fileName, id, dataForUpdate);
    }

    deleteOne(id) {
        return this.repository.deleteEntity(this.fileName, id);
    }

    getName() {
        return this.fileName;
    }
}

const userModel = new User();

module.exports = userModel;
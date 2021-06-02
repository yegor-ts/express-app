const postDbModel = require('../../database/models').Post;

class PostModel {
    constructor() {
        this.postModel = postDbModel;
    }

    findAll() {
        return this.postModel.findAll();
    }

    findOne(id) {
        return this.postModel.findOne({
            where: {
                id: id
            }
        });
    }

    create(body) {
        return this.postModel.create(body);
    }

    update(id, dataForUpdate) {
        return this.postModel.findOne({
            where: {
                id: id
            }
        }).then( post => {
            return post.update(dataForUpdate);
        });
    }

    delete(id) {
        return this.postModel.findOne({
            where: {
                id: id
            }
        }).then( post => post.destroy());
    }
}

const post = new PostModel();

module.exports = post;
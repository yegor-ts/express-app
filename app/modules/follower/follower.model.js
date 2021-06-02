const followerDbModel = require('../../database/models').Follower;

class FollowerModel {
    constructor() {
        this.followerModel = followerDbModel;
    }

    create(body) {
        return this.followerModel.create(body);
    }

    findOne(targetId, followerId) {
        return this.followerModel.findOne({ where: {
                targetId,
                followerId
            }
        });
    }

    update(dataForUpdate) {
        return this.followerModel.updatePostById(dataForUpdate);
    }

    findAll() {
        return this.followerModel.findAll();
    }
}

const followerModel = new FollowerModel();

module.exports = followerModel;
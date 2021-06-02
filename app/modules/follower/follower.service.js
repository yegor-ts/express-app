const followerModel = require('./follower.model');

class FollowerService {
    constructor() {
        this.followerModel = followerModel;
    }

    async acceptFollow(targetId, followerId) {
        return  this.followerModel.findOne(targetId, followerId)
            .then( follower => follower.update({ status: 'Accepted' }));
    }

    declineFollow(targetId, followerId) {
        return  this.followerModel.findOne(targetId, followerId)
            .then( follower => follower.update({ status: 'Declined' }));
    }

    followPerson(body) {
        return this.followerModel.create(body);
    }

    unfollowPerson(targetId, followerId) {
        return this.followerModel.findOne({
            where: {
                targetId,
                followerId
            }
        }).then( follower => {
            return follower.destroy();
        });
    }

    getAll() {
        return this.followerModel.findAll();
    }
}

const followerService = new FollowerService();

module.exports = followerService;
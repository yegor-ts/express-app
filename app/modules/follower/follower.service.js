const followerModel = require('../../database/models').Follower;

class FollowerService {
    constructor() {
        this.followerModel = followerModel;
    }

    acceptFollow(targetId, followerId) {
        return  followerModel.findOne({
            where: {
                targetId,
                followerId
            }
        }).then( follower => {
            follower.update({status: 'Accepted'});
        });
    }

    declineFollow(targetId, followerId) {
        return followerModel.findOne({
            where: {
                targetId,
                followerId
            }
        }).then( follower => {
            return follower.update({status: 'Declined'});
        });
    }

    followPerson(body) {
        return this.followerModel.create(body);
    }

    unfollowPerson(targetId, followerId) {
        return followerModel.findOne({
            where: {
                targetId,
                followerId
            }
        }).then( follower => {
            return follower.destroy();
        });
    }
}

const followerService = new FollowerService();

module.exports = followerService;
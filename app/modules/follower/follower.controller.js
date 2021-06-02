const http = require('http');

const followerService = require('./follower.service');

exports.follow = async (req, res) => {
    try {
        const followerBody = {
            targetId: req.body.targetId,
            followerId: req.body.followerId
        };
        await followerService.followPerson(followerBody);
        res.send(followerBody);
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};

exports.accept = async (req, res) => {
    try {
        const { followerId, targetId } = req.body;
        const updatedFollow = await followerService.acceptFollow(targetId, followerId);

        res.send(updatedFollow);
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};

exports.decline = async (req, res) => {
    try {
        const { followerId, targetId } = req.body;
        const updatedFollow = await followerService.declineFollow(targetId, followerId);

        res.send(updatedFollow);
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};

exports.unfollow = async (req, res) => {
    try {
        await followerService.unfollowPerson(req.user.id, req.params.id);

        res.end();
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};

exports.getAllFollowers = async (req, res) => {
    try {
        const followers = await followerService.getAll();

        res.send(followers);
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
}
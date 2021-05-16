const http = require('http');

const followerService = require('./follower.service');

exports.follow = async (req, res) => {
    try {
        const followerBody = {
            targetId: req.params.id,
            followerId: req.user.id
        };
        await followerService.followPerson(followerBody);
        res.send(followerBody);
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};

exports.accept = async (req, res) => {
    try {
        await followerService.acceptFollow(req.user.id, req.params.id);

        res.end();
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};

exports.decline = async (req, res) => {
    try {
        await followerService.declineFollow(req.user.id, req.params.id);

        res.end();
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
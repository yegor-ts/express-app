const http = require('http');

const postService = require('./post.service');

exports.signupPost = async (req, res) => {
    try {
        const postBody = {
            text: req.body.text,
            authorId: req.body.authorId
        }
        const post = await postService.createPost(postBody);

        res.send(post);
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};

exports.getPost = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await postService.findPostById(id);
        if(post === null) {
            res.send('No such post');
        }

        res.json(post);
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const postsList = await postService.findAllPosts();

        res.json(postsList);
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};

exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await postService.updatePostById(req.params.id, req.body);

        res.json(updatedPost);
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};

exports.deletePost = async (req, res) => {
    try {
        const {id} = req.params;

        await postService.deletePostById(id);

        res.send('Post was deleted');
    } catch (e) {
        res.end(http.STATUS_CODES[204]);
    }
};
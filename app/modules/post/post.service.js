const postModel = require('./post.model');
const followerModel = require('../../database/models').Follower;

class PostService {
    constructor() {
        this.postModel = postModel;
    }

    createPost(body) {
        return this.postModel.create(body);
    }

    findPostById(id) {
        return this.postModel.findOne(id);
    }

    findAllPosts() {
        return this.postModel.findAll();
    }

    updatePostById(id, dataForUpdate) {
       return this.postModel.update(id, dataForUpdate);
    }

    async deletePostById(id, currentUserId) {
        try {
            const authorId = await postModel.findOne({
                where: {
                    id
                }
            })
                .then(post => post.authorId)
                .catch(err => console.log('No post created by user', err));
            if(authorId === currentUserId) {
                const postById = await this.postModel.findOne(id);
                return postById.destroy();
            } else {
                console.log('You arent an owner of post');
            }
        } catch (e) {
            console.log(e);
        }
    }
}

const postService = new PostService();

module.exports = postService;
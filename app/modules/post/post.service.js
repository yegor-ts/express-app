const postModel = require('../../database/models').Post;
const followerModel = require('../../database/models').Follower;

class PostService {
    constructor() {
        this.postModel = postModel;
    }

    createPost(body) {
        return this.postModel.create(body);
    }

    async findPostById(id, followerId) {
        try {
            const authorId = await postModel.findOne({
                where: {
                    id
                }
            })
                .then( post => post.authorId)
                .catch( err => console.log('No post created by this user', err));

            if(followerId === authorId) {
                return this.postModel.findByPk(id);
            }
            const targetId = authorId;
            const status = await followerModel.findOne({
                where: {
                    targetId,
                    followerId
                }
            })
                .then( follower => follower.status)
                .catch( err => console.log('You arent a follower'));

            if(status === 'Accepted') {
                return this.postModel.findByPk(id);
            }
        } catch (e) {
            console.log(e);
        }
    }

    findAllPosts() {
        return this.postModel.findAll();
    }

    async updatePostById(id, dataForUpdate, currentUserId) {
        try {
            const authorId = await postModel.findOne({
                where: {
                    id
                }
            })
                .then(post => post.authorId)
                .catch( err => console.log('No post created by user', err));
            if(authorId === currentUserId) {
                const updatedPost = await this.postModel.findByPk(id)
                    .then( post => {
                        return Object.assign(post, dataForUpdate);
                    })
                    .catch(err => console.log('Cant update a post', err));
                return updatedPost.save();
            } else {
                console.log('You arent an owner of post');
            }
        } catch (e) {
            console.log(e);
        }
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
                const postById = await this.postModel.findByPk(id);
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
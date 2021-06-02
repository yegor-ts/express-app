const postService = require('../../modules/post/post.service');
const postModel = require('../../modules/post/post.model');

const mockService = (serviceName, res, isErr) => {
   jest.spyOn(postModel, serviceName).mockImplementation(() => {
      if (isErr) {
         return Promise.reject(res);
      } else {
         return Promise.resolve(res);
      }
   });
};

describe('Post service', () => {
   const postServiceProto = Object.getPrototypeOf(postService);
   Object.setPrototypeOf(postService, Object.assign(postServiceProto, postModel));

   test('create new post (proper values)', async () => {
      const fields = {
         text: 'Some text'
      };
      const post = {
         text: 'Some text'
      };
      mockService('create', post);
      await expect(postService.createPost(fields)).resolves.toEqual(post);
   });

   test('create new post (improper values)', async () => {
      const fields = {
         text: 12345
      };
      mockService('create', new Error('Db validation error'), true);
      await expect(postService.createPost(fields)).rejects.toThrowError();
   });

   test('get post by id (proper values)', async () => {
      const user = {
         id: 153,
      };
      mockService('findOne', user);
      await expect(postService.findPostById(153)).resolves.toEqual(user);
   });

   test('get post by id (improper values)', async () => {
      mockService('findOne', new Error('some database error'), true);
      await expect(postService.findPostById('string')).rejects.toThrowError();
   });

   test('get post by id (non-existent post)', async () => {
      mockService('findOne', undefined, false);
      await expect(postService.findPostById(2000)).resolves.toBeUndefined();
   });

   test('get posts (proper values)', async () => {
      const posts = [
         {id: 1,
         text: 'Some text',
         authorId: 12}
      ];
      mockService('findAll', posts);
      await expect(postService.findAllPosts()).resolves.toEqual(posts);
   });
});
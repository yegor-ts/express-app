'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('posts', [{
      id: '2bfdcf4a-4197-4efe-9453-0efe3401f803',
      text: 'Hello, this is my new post',
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: '05b24e5c-88cb-4045-bfaf-3dc6e3c3d250'
    },
      {
        id: 'afdb7d93-4ac3-4c7a-a062-65fa7cea5abe',
        text: 'Hello, World!',
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: '0998baba-0634-49c9-94c9-8610ff050dfb'
      }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('posts', null, {})
  }
};

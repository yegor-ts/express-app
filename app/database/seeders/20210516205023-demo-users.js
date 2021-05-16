'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: '05b24e5c-88cb-4045-bfaf-3dc6e3c3d250',
      name: 'Yegor',
      email: 'yegor@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        id: '0998baba-0634-49c9-94c9-8610ff050dfb',
        name: 'John',
        email: 'john.doe@yahoo.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '0a5a07f5-c5ac-49f6-a855-c00d397c7e68',
        name: 'Anthony',
        email: 'sheep.sheep@ukr.ua',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
};

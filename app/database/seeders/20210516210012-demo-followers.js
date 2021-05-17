'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('followers', [{
      id: 1,
      status: 'Accepted',
      followerId: '0998baba-0634-49c9-94c9-8610ff050dfb',
      createdAt: new Date(),
      updatedAt: new Date(),
      targetId: '05b24e5c-88cb-4045-bfaf-3dc6e3c3d250'
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('followers', null, {})
  }
};

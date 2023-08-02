'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Categories', [{
      id: 1,
      name: 'Electronic',
      parent_id: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'car',
      parent_id: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'phone',
      parent_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 3,
      name: 'tv',
      parent_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 4,
      name: 'honda',
      parent_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  {
    id: 5,
      name: 'maruti',
      parent_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
  }],);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

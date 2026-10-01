'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let now = new Date();
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('categories', [
      {
        id: 1,
        name: 'Маргарита',
        slug: 'margarita',
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        name: 'Грибная',
        slug: 'gribnaya',
        created_at: now,
        updated_at: now
      }
   ]);
   await queryInterface.bulkInsert('sizes', [
    {
        id: 1,
        sizes: '[20, 30, 60]',
        created_at: now,
        updated_at: now
      }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.bulkDelete('sizes', null, {});
  }
};

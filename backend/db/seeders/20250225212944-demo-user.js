'use strict';

const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');


const users = [
  {
    email: 'demo@user.io',
    username: 'demoUser',
    hashedPassword: bcrypt.hashSync('demoPassword')
  },
  {
    email: 'test@user.io',
    username: 'testUser',
    hashedPassword: bcrypt.hashSync('testPassword')
  },
  {
    email: 'example@user.io',
    username: 'exampleUser',
    hashedPassword: bcrypt.hashSync('examplePassword')
  }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', users);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', {
      username: {
        [Op.in]: ['DemoUser', 'testUser', 'exampleUser']
      }
    });
  }
};

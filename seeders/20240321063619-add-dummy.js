'use strict';

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
    await queryInterface.bulkInsert('Users', [{
      username: 'user1',
      email: 'user1@user.com',
      password: '$2b$08$VRChSbG/3wFfcH/UN1F81.I6n4/lSO4/yyT19CX.jBVNmPNbkKahK',
      role: 'mob',
      createdAt: new Date(),
      updatedAt: new Date()
     },{
      username: 'user2',
      email: 'user2@user.com',
      password: '$2b$08$VRChSbG/3wFfcH/UN1F81.6LDukpj04T/HyVbhg9cZ9EtPgKWSnCO',
      role: 'mob',
      createdAt: new Date(),
      updatedAt: new Date()
     },{
      username: 'user3',
      email: 'user3@user.com',
      password: '$2b$08$VRChSbG/3wFfcH/UN1F81.CBZFuB6jxVvP5VIiA4Yab5tz.HuEG8m',
      role: 'mob',
      createdAt: new Date(),
      updatedAt: new Date()
     },{
      username: 'user4',
      email: 'user4@user.com',
      password: '$2b$08$VRChSbG/3wFfcH/UN1F81.UV0B7aTAVcOrUeYEVhgZsQOs3f13pDi',
      role: 'mob',
      createdAt: new Date(),
      updatedAt: new Date()
     },])
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

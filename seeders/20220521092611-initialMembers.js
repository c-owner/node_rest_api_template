'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Members', [
          {
            name: 'Alex',
            team: 'engineering',
            position: 'Server Developer',
            emailAddress: 'alex@google.com',
            phoneNumber: '010-xxxx-xxxx',
            admissionDate: '2018/12/10',
            birthday: '1994/11/08',
            profileImage: 'profile1.png',
          },
        ]
    )
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },
  
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

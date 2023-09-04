'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name : {
        type: Sequelize.STRING,
        allowNull : false,
        unique : false
      },
      last_name : {
        type: Sequelize.STRING,
        allowNull : false,
        unique : false
      },
      email : {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true,
        validate : {
          isEmail : {
            args : true,
            msg : 'must be a valid email' 
          }
        }
      },
      username:
      {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true
      },
      role : {
        type: Sequelize.STRING,
        allowNull : false,
        unique : false
      },
      password: {
        type: Sequelize.STRING,
        allowNull : false,
        unique : false
      }, 
      confirm : {
        type: Sequelize.STRING,
        allowNull : false,
        unique : false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
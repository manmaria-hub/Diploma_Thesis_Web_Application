'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('halls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Hall_category : {
        type: Sequelize.STRING, 
        defaultValue : '',
        allowNull : false, 
      },
      Hall_type : {
        type: Sequelize.STRING,
        defaultValue:'',
        allowNull : false
      },
      Hall_floor : {
        type: Sequelize.STRING,
        defaultValue:'',
        allowNull : false
      },
      Hall_code : {
        autoIncrement: false,
        allowNull: false, 
        defaultValue:'',
        unique: true,
        type: Sequelize.STRING
      },
      Hall_label : {
        type: Sequelize.STRING,
        defaultValue:'',
        allowNull : false
      },
      Hall_capacity : {
        defaultValue:'',
        type: Sequelize.STRING,

        allowNull : false, 
      },
      Hall_owner_owner_name : {
        defaultValue:'',
        type: Sequelize.STRING,
        allowNull : false, 
      },
      Hall_owner_owner_email : {
        type: Sequelize.STRING,
        defaultValue:'',
        allowNull : false,         
      },      
    })
},
  async down(queryInterface, Sequelize) {
    
    await queryInterface.dropTable('halls');  

  }
};

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('professors', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
      PERSONAL_INFO_first_name : { 
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false
      },
      PERSONAL_INFO_last_name : {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false
      },
      PERSONAL_INFO_father_FirstName : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      PERSONAL_INFO_father_LastName : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      PERSONAL_INFO_mother_FirstName : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      PERSONAL_INFO_mother_LastName : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      PERSONAL_INFO_maiden_name : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      PERSONAL_INFO_family : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      PERSONAL_INFO_gender : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      PERSONAL_INFO_active : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
  
  
  
  
  
      ACADEMIC_INFO_departmentName: {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      ACADEMIC_INFO_category : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      ACADEMIC_INFO_professor_type : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      ACADEMIC_INFO_position : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      ACADEMIC_INFO_office : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      ACADEMIC_INFO_office_hours : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      ACADEMIC_INFO_office_email : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      ACADEMIC_INFO_office_telephone : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      ACADEMIC_INFO_specialization : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      ACADEMIC_INFO_diploma : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      ACADEMIC_INFO_doctorat : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      ACADEMIC_INFO_website: {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      ACADEMIC_INFO_CV : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      ACADEMIC_INFO_scholar : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      ACADEMIC_INFO_academic_email: {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      ACADEMIC_INFO_username: {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },  
  
  
      INSURANCE_INFO_AMKA: {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      INSURANCE_INFO_AMKA_country : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      INSURANCE_INFO_AFM : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      INSURANCE_INFO_AFM_country : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      INSURANCE_INFO_DOY : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      INSURANCE_INFO_nationality : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      INSURANCE_INFO_identity_number : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      INSURANCE_INFO_identity_type : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
  
  
  
  
      COMMUNICATION_DETAILS_telephone : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      COMMUNICATION_DETAILS_mobile : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      COMMUNICATION_DETAILS_alternative_email : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      COMMUNICATION_DETAILS_city: {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      COMMUNICATION_DETAILS_road : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      COMMUNICATION_DETAILS_number : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },
      COMMUNICATION_DETAILS_region: {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false          
      },
      COMMUNICATION_DETAILS_postcode : {
          type: Sequelize.TEXT,
          allowNull : false,
          unique : false
      },           
  },  
  {
    timestamps: false
  });  
},
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('professors');
  }
};
'use strict';
const { validate } = require('graphql');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Professor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Professor.init({ 
    PERSONAL_INFO_first_name : {
      type: DataTypes.TEXT,
      allowNull : false,
      unique : false
    },
    PERSONAL_INFO_last_name : {
      type: DataTypes.TEXT,
      allowNull : false,
      unique : false
    },
    PERSONAL_INFO_father_FirstName : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    PERSONAL_INFO_father_LastName : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    PERSONAL_INFO_mother_FirstName : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    PERSONAL_INFO_mother_LastName : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    PERSONAL_INFO_maiden_name : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    PERSONAL_INFO_family : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    PERSONAL_INFO_gender : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    PERSONAL_INFO_active : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },





    ACADEMIC_INFO_departmentName: {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    ACADEMIC_INFO_category : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    ACADEMIC_INFO_professor_type : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    ACADEMIC_INFO_position : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    ACADEMIC_INFO_office : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    ACADEMIC_INFO_office_hours : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    ACADEMIC_INFO_office_email : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    ACADEMIC_INFO_office_telephone : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    ACADEMIC_INFO_specialization : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    ACADEMIC_INFO_diploma : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    ACADEMIC_INFO_doctorat : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    ACADEMIC_INFO_website: {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    ACADEMIC_INFO_CV : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    ACADEMIC_INFO_scholar : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    ACADEMIC_INFO_academic_email: {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    ACADEMIC_INFO_username : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },




    INSURANCE_INFO_AMKA: {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    INSURANCE_INFO_AMKA_country : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    INSURANCE_INFO_AFM : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    INSURANCE_INFO_AFM_country : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    INSURANCE_INFO_DOY : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    INSURANCE_INFO_nationality : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    INSURANCE_INFO_identity_number : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    INSURANCE_INFO_identity_type : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },

    COMMUNICATION_DETAILS_telephone : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    COMMUNICATION_DETAILS_mobile : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    COMMUNICATION_DETAILS_alternative_email : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    COMMUNICATION_DETAILS_city: {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    COMMUNICATION_DETAILS_road : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    COMMUNICATION_DETAILS_number : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    COMMUNICATION_DETAILS_region: {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },
    COMMUNICATION_DETAILS_postcode : {
        type: DataTypes.TEXT,
        allowNull : false,
        unique : false
    },    
  },    
  {
    sequelize,
    timestamps : false,
    modelName: 'Professor',
    tableName: 'professors'
  });
  return Professor;
};

'use strict';
const {
  Model 
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Hall extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hall.init({ 
    Hall_category : {
      type: DataTypes.STRING,
      allowNull : false,
      defaultValue :'',
      unique : false
    },
    Hall_type : {
      type: DataTypes.STRING,
      allowNull : false,
      defaultValue :'',
      unique : false
    },
    Hall_floor : {
      type: DataTypes.STRING,
      allowNull : false,
      defaultValue :'',
      unique : false
    },
    Hall_code : {
      type: DataTypes.STRING,
      allowNull : false,
      defaultValue :'',
      unique : true
    },
    Hall_label : {
      type: DataTypes.STRING,
      allowNull : false,
      defaultValue :'',
      unique : false
    },
    Hall_capacity : {
      type: DataTypes.STRING,
      allowNull : false,
      unique : false,
      defaultValue :''
    },
    Hall_owner_owner_name : {
      type: DataTypes.STRING,
      allowNull : false,
      defaultValue :'',
      unique : false
    },
    Hall_owner_owner_email : {
      type: DataTypes.STRING,
      allowNull : false,
      defaultValue :'',
      unique : false
    }
  }, {
    sequelize,
    modelName: 'Hall',
    tableName : 'halls',
    timestamps : false, 
    initialAutoIncrement:false
  });
  return Hall;
};
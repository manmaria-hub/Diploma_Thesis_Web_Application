'use strict';
const { validate } = require('graphql');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({ 
    first_name : {
      type: DataTypes.STRING,
      allowNull : false,
      unique : false
    },
    last_name : {
      type: DataTypes.STRING,
      allowNull : false,
      unique : false
    },
    email : {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull : false,
      unique : true
    },
    role : {
      type: DataTypes.STRING,
      allowNull : false,
      unique : false
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false,
      unique : false
    }, 
    confirm : {
      type: DataTypes.STRING,
      allowNull : false,
      unique : false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};

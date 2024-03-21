'use strict';
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
      // User.belongsTo(models.Profile)
      User.hasOne(models.Profile)
      User.hasMany(models.Comment)
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Email cant be null diot"
        },
        notEmpty: {
          msg: "Email cant be empty diot"
        },
        len:{
          args: [5, 50],
          msg: "Email must be between 5 and 50 character diot"
        },
        isEmailFormat(value) {
          if (!value.includes('@')) {
            throw new Error('You sure you inputting some email bruh? wheres the @?');
          }
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Password cant be null diot"
        },
        notEmpty: {
          msg: "Password cant be empty diot"
        },
        len:{
          args: [5, 25],
          msg: "Password must be between 5 and 25 character diot"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'mob'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  const { faker } = require('@faker-js/faker');
  const bcrypt = require('bcrypt');
  const salt = bcrypt.genSaltSync(8);
  User.beforeCreate((x,options) =>{
    const hash = bcrypt.hashSync(x.dataValues.password, salt);
    x.password = hash;
    switch (x.dataValues.username) {
      case 'bird':
        x.username = faker.animal.bird()
        break;
      case 'cat':
        x.username = faker.animal.cat()
        break;
      case 'dog':
        x.username = faker.animal.dog()
        break;
      case 'insect':
        x.username = faker.animal.insect()
        break;
      default:
        x.username = faker.animal.fish()
        break;
    }
  })
  User.beforeUpdate((x,options) =>{
    switch (x.dataValues.username) {
      case 'bird':
        x.username = faker.animal.bird()
        break;
      case 'cat':
        x.username = faker.animal.cat()
        break;
      case 'dog':
        x.username = faker.animal.dog()
        break;
      case 'insect':
        x.username = faker.animal.insect()
        break;
      default:
        x.username = faker.animal.fish()
        break;
    }
  })
  return User;
};
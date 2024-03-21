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
    get title(){
      if(this.role == "god"){
        return "Almighty"
      } else{
        return "Pleb"
      }
    }
    static async login(email){
      let data = await User.findOne({
        where:{
            email
        }
      })
      return data
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
          msg: "Thine electronic missive, thou dullard, cannot remain empty#"
        },
        notEmpty: {
          msg: "Thine electronic missive, thou dullard, cannot remain empty#"
        },
        len:{
          args: [5, 50],
          msg: "The email, thou imbecile, must span betwixt five and fifty characters#"
        },
        isEmailFormat(value) {
          if (!value.includes('@')) {
            throw new Error('Art thou certain thou hath entered an electronic missive, knave? Wherefore is the @ sign?#');
          }
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "The password, thou fool, cannot be left vacant#"
        },
        notEmpty: {
          msg: "The password, thou fool, cannot be left vacant#"
        },
        len:{
          args: [5, 25],
          msg: "The password, thou witless wretch, must range between five and twenty-five characters#"
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
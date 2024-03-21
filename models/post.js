'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.hasMany(models.Comment)
      // Post.hasMany(models.PostTag)
      Post.belongsToMany(models.Tag,{through:models.PostTag})
    }
  }
  Post.init({
    title:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Title cant be null diot"
        },
        notEmpty: {
          msg: "Title cant be empty diot"
        },
        len:{
          args: [5, 100],
          msg: "Title must be between 5 and 100 character diot"
        }

      }
    },
    content:{
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Content cant be null diot"
        },
        notEmpty: {
          msg: "Content cant be empty diot"
        },
        len:{
          args: [5, 735],
          msg: "Content must be between 5 and 735 character diot"
        }
      }
    },
    vote:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    } 
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
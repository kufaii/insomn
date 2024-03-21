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
          msg: "The title, thou simpleton, cannot be left void"
        },
        notEmpty: {
          msg: "The title, thou simpleton, cannot be left void"
        },
        len:{
          args: [5, 100],
          msg: "The title, thou ignoramus, must range between five and one hundred characters"
        }

      }
    },
    content:{
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Empty content, thou ninny, cannot be tolerated"
        },
        notEmpty: {
          msg: "Empty content, thou ninny, cannot be tolerated"
        },
        len:{
          args: [5, 735],
          msg: "Verily, content must span betwixt five and seven hundred thirty-five characters, thou dolt"
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
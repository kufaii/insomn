'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User)
      Comment.belongsTo(models.Post)
    }
  }
  Comment.init({
    content:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "The content, thou witless fool, must not remain vacant"
        },
        notEmpty: {
          msg: "The content, thou witless fool, must not remain vacant"
        },
        len:{
          args: [5, 225],
          msg: "The content, thou simpleton, must span betwixt five and two hundred fifty-five characters in length"
        }
      }
    },
    PostId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
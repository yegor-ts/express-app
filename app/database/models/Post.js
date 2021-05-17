'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'authorId',
        onDelete: 'CASCADE',
      });
    }
  };
  Post.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    text: {
      type: DataTypes.TEXT,
      len: {
        args: [1, 100],
      }
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
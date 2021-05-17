'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: 'authorId'
      });
      User.hasMany(models.Follower, {
        foreignKey: 'followerId'
      });
      User.hasMany(models.Follower, {
        foreignKey: 'targetId'
      });
    }
  }

  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      len: {
        args: [2, 32],
      }
    },
    email: {
      type: DataTypes.STRING,
      isUnique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
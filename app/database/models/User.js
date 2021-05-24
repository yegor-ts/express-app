'use strict';

const bcrypt = require('bcrypt');

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
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate: async (user) => {
        if(user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if(user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    },
    instanceMethods: {
      validPassword(password) {
        return bcrypt.compare(password, this.password);
      }
    }
  });
  User.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
  }
  return User;
};
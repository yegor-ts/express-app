'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    static associate(models) {
      Follower.belongsTo(models.User, {
        foreignKey: 'followerId',
        as: 'FollowerId',
        onDelete: 'CASCADE'
      });
      Follower.belongsTo(models.User, {
        foreignKey: 'targetId',
        as: 'TargetId',
        onDelete: 'CASCADE'
      });
    }
  };
  Follower.init({
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Pending', 'Accepted', 'Declined'],
      defaultValue: 'Pending'
    },
    followerId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Follower',
  });
  return Follower;
};
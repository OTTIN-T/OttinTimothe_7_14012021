'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LikePost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.LikePost.belongsTo(models.User, { //Relations entre la table de réfèrence
        foreignKey: { //Notre clef étrangère
          allowNull: false
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }),
        models.LikePost.belongsTo(models.Post, {
          foreignKey: {
            allowNull: false
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        })
    }
  };
  LikePost.init({
    isLike: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'LikePost',
  });
  return LikePost;
};
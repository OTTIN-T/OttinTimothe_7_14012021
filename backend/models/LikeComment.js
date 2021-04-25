'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LikeComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.LikeComment.belongsTo(models.User, { //Relations entre la table de réfèrence
        foreignKey: { //Notre clef étrangère
          allowNull: false
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }),
        models.LikeComment.belongsTo(models.Comment, {
          foreignKey: {
            allowNull: false
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        })
    }
  };
  LikeComment.init({
    isLike: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'LikeComment',
  });
  return LikeComment;
};
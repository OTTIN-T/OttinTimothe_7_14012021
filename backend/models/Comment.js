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
      models.Comment.belongsTo(models.User, { //belongsTo = type de relation
        foreignKey: { //Notre clef étrangère
          allowNull: false
        },
        onDelete: 'CASCADE'
      }),
        models.Comment.belongsTo(models.Post, {
          foreignKey: { //Notre clef étrangère
            allowNull: false
          },
          onDelete: 'CASCADE'
        })
    }
  };
  Comment.init({
    userName: DataTypes.STRING,
    comment: DataTypes.STRING,
    like: DataTypes.INTEGER,
    reported: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
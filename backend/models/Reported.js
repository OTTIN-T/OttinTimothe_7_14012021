'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reported extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Reported.belongsTo(models.User, { //Relations entre la table de réfèrence
        foreignKey: "userReporterId",
        onDelete: 'CASCADE'
      }),
        models.Reported.belongsTo(models.User, {
          foreignKey: "userReportedId",
          onDelete: 'CASCADE'
        })
    }
  };
  Reported.init({
    message: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    commentId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userReporterId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userReportedId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    reported: {
      allowNull: false,
      type: DataTypes.TINYINT,
    }
  }, {
    sequelize,
    modelName: 'Reported',
  });
  return Reported;
};
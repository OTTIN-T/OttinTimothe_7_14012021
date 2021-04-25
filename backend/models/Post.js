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
      models.Post.belongsTo(models.User, { //belongsTo = type de relation
        foreignKey: { //Notre clef étrangère
          allowNull: false
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
        models.Post.hasMany(models.Comment, {
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          hooks: true
        })
    }
  };
  Post.init({
    title: DataTypes.STRING,
    userName: DataTypes.STRING,
    message: DataTypes.STRING,
    like: DataTypes.INTEGER,
    link: DataTypes.STRING,
    comment: DataTypes.STRING,
    reported: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};





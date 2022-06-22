'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Team.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      creator: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references :{
          model:"Users",
          key: "id"
        }
      },
      members: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      admins: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};
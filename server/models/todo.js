'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Todo.init({
    creator: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references :{
          model:"Users",
          key: "id"
        }
      },
    team: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references :{
        model:"Teams",
        key: "id"
        },
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    isPublic:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
  },{
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
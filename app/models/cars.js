'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cars.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    size: DataTypes.ENUM('small', 'medium', 'large'),
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    deleted_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cars',
  });
  return Cars;
};
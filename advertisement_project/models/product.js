'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    product_id: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    description: DataTypes.STRING,
    baseprice: DataTypes.INTEGER,
    bidding: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    address_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
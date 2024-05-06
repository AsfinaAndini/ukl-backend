'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_detail extends Model {
    static associate(models) {
      this.belongsTo(models.food)
      this.belongsTo(models.order_list)
    }
  }
  order_detail.init({
    id_order: DataTypes.INTEGER,
    id_food: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order_detail',
  });
  return order_detail;
};
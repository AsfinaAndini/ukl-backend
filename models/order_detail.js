'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_detail extends Model {
    static associate(models) {
      order_detail.belongsTo(models.foods, { foreignKey: 'id_food' }); 
      order_detail.belongsTo(models.order_list, { foreignKey: 'id_order' }); 
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
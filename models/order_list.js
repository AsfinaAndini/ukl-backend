'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_list extends Model {
    static associate(models) {
      this.hasMany(models.order_detail, {
        foreignKey: "id", as: "order_detail"
      })
    }
  }
  order_list.init({
    customer_name: DataTypes.STRING,
    table_number: DataTypes.STRING,
    order_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'order_list',
  });
  return order_list;
};
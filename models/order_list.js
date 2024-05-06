'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_list extends Model {
    static associate(models) {
      this.hasMany(models.order_detail, {
        foreignKey: "id_order", as: "list_detail"
      })
    }
  }
  order_list.init({
    name_customer: DataTypes.STRING,
    table_number: DataTypes.STRING,
    order_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'order_list',
  });
  return order_list;
};
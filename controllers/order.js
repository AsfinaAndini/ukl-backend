const detailModel = require("../models/index").order_detail;
const orderModel = require("../models/index").order_list;

exports.order = async (req, res) => {
  try {
    // Extract req data
    const { customer_name, table_number, order_date, order_detail } = req.body;

    // Create the order list entry
    const newOrderList = await orderModel.create({
      name_customer: customer_name,
      table_number: table_number,
      order_date: order_date,
    });

    for (const detail of order_detail) {
      await detailModel.create({
        id_order: newOrderList.id,
        id_food: detail.food_id,
        quantity: detail.quantity,
        price: detail.price,
      });
    }

    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.orderHistory = async (req, res) => {
  try {
    let data = await orderModel.findAll({
      include: [
        {
          model: detailModel,
          as: "order_detail",
        },
      ],
    });
    return res.status(200).json({
      status: true,
      data: data,
      message: "Order list has been loaded",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

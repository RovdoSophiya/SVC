const Order = require("../models/Order");

const handleError = (res, error) => {
  console.error("Error:", error);
  res.status(500).json({ error: error.message });
};

// Добавление заказа
const addOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    handleError(res, error);
  }
};

// Удаление заказа
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    await order.destroy();
    res.json({ message: "Order deleted" });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  addOrder,
  deleteOrder,
};

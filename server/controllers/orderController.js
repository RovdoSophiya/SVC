const Order = require("../models/Order");
const Delivery = require("../models/Delivery");
const OrderedDish = require("../models/OrderedDish");
const Courier = require("../models/Courier");
const Dish = require("../models/Dish");
const { Op } = require("sequelize");

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

const getClientOrders = async (req, res) => {
  try {
    const {
      clientid,
      page = 1,
      limit = 5,
      sortBy = "orderdate",
      order = "ASC",
    } = req.query;

    const offset = (page - 1) * limit;

    const orders = await Order.findAndCountAll({
      where: { clientid },
      include: [
        {
          model: Delivery,
          include: [
            {
              model: Courier,
              attributes: ["name", "lastname", "phone"],
            },
          ],
        },
        {
          model: OrderedDish,
          include: [
            {
              model: Dish,
              attributes: ["name", "price"],
            },
          ],
        },
      ],
      order: [[sortBy, order]],
      limit: parseInt(limit),
      offset,
    });

    const formattedOrders = orders.rows.map((order) => ({
      id: order.id,
      orderdate: order.orderdate,
      totalamount: order.totalamount,
      delivery: {
        status: order.Delivery?.status || "none",
        courier: order.Delivery?.Courier
          ? {
              name: order.Delivery.Courier.name,
              lastname: order.Delivery.Courier.lastname,
              phone: order.Delivery.Courier.phone,
            }
          : "Courier has not picked up the order",
      },
      orderedDishes: order.OrderedDishes.map((dish) => ({
        name: dish.Dish.name,
        price: dish.Dish.price,
        quantity: dish.quantity,
        totalprice: dish.totalprice,
      })),
    }));

    res.status(200).json({
      orders: formattedOrders,
      total: orders.count,
    });
  } catch (error) {
    console.error("Error fetching client orders:", error);
    res.status(500).json({ error: "An error occurred while fetching orders." });
  }
};

module.exports = {
  addOrder,
  deleteOrder,
  getClientOrders,
};

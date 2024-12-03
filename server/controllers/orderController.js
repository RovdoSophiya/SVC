const Order = require("../models/Order");
const Delivery = require("../models/Delivery");
const OrderedDish = require("../models/OrderedDish");
const Courier = require("../models/Courier");
const Dish = require("../models/Dish");
const { Op } = require("sequelize");
const officegen = require("officegen");

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

    const statusFilter = {
      [Op.or]: [
        { status: "Pending" },
        { status: "On the way" },
        { status: "Delivered" },
      ],
    };

    const orders = await Order.findAndCountAll({
      where: { clientid },
      include: [
        {
          model: Delivery,
          attributes: ["status", "deliveryaddress", "deliverydate"],
          required: false,
          where: {
            ...statusFilter,
          },
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

const getCurrentClientOrders = async (req, res) => {
  try {
    const { clientid, page = 1, limit = 5 } = req.query;

    const offset = (page - 1) * limit;

    const statusFilter = {
      [Op.or]: [{ status: "Pending" }, { status: "On the way" }],
    };

    const orders = await Order.findAndCountAll({
      where: { clientid },
      include: [
        {
          model: Delivery,
          attributes: ["status", "deliveryaddress", "deliverydate"],
          required: false,
          where: {
            ...statusFilter,
          },
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
      limit: parseInt(limit),
      offset,
    });

    const formattedOrders = orders.rows.map((order) => ({
      id: order.id,
      orderdate: order.orderdate,
      totalamount: order.totalamount,
      delivery: {
        status: order.Delivery ? order.Delivery.status : "none",
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

    const filteredOrders = formattedOrders.filter(
      (order) =>
        order.delivery.status === "Pending" ||
        order.delivery.status === "On the way"
    );

    res.status(200).json({
      orders: filteredOrders,
      total: filteredOrders.length,
    });
  } catch (error) {
    console.error("Error fetching client orders:", error);
    res.status(500).json({ error: "An error occurred while fetching orders." });
  }
};

const downloadOrdersWord = async (req, res) => {
  try {
    const { clientid } = req.query;

    const ordersResponse = await getClientOrders({ query: { clientid } }, res);

    if (ordersResponse.status !== 200) {
      return res
        .status(ordersResponse.status)
        .json({ error: "Failed to fetch orders." });
    }

    const formattedOrders = ordersResponse.data.orders;

    const doc = officegen("doc");

    // Заголовок документа
    doc.addParagraph("Список заказов", { align: "center", font_size: 24 });
    doc.putPageBreak(); // Переход на новую страницу после заголовка

    formattedOrders.forEach((order) => {
      doc.addParagraph(`ID заказа: ${order.id}`);
      doc.addParagraph(`Дата: ${new Date(order.orderdate).toLocaleString()}`);
      doc.addParagraph(`Общая сумма: ${order.totalamount}`);
      doc.addParagraph(`Статус доставки: ${order.delivery.status}`);

      const courierInfo =
        typeof order.delivery.courier === "object"
          ? `Курьер: ${order.delivery.courier.name} ${order.delivery.courier.lastname}, Телефон: ${order.delivery.courier.phone}`
          : `Курьер: ${order.delivery.courier}`;
      doc.addParagraph(courierInfo);

      const orderedDishes = order.orderedDishes
        .map(
          (dish) =>
            `${dish.name} (Количество: ${dish.quantity}, Цена: ${dish.totalprice})`
        )
        .join(", ");
      doc.addParagraph(`Заказанные блюда: ${orderedDishes}`);

      // Добавление разделителя между заказами
      doc.addParagraph(""); // Пустой параграф для отступа
      doc.addParagraph("---"); // Линия-разделитель
      doc.addParagraph(""); // Пустой параграф для отступа
    });

    // Установка заголовков для скачивания файла
    res.setHeader("Content-Disposition", "attachment; filename=orders.doc");
    res.setHeader("Content-Type", "application/msword");

    // Генерация документа
    const buffer = await new Promise((resolve, reject) => {
      doc.generate(res, {
        final: (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        },
      });
    });

    // Отправка документа
    res.end(buffer);
  } catch (error) {
    console.error("Error generating Word file:", error);
    if (!res.headersSent) {
      res
        .status(500)
        .json({ error: "An error occurred while generating the Word file." });
    }
  }
};

module.exports = {
  addOrder,
  deleteOrder,
  getClientOrders,
  getCurrentClientOrders,
  downloadOrdersWord,
};

const { Op } = require("sequelize");
const Delivery = require("../models/Delivery");
const Client = require("../models/Client");
const Courier = require("../models/Courier");
const OrderedDish = require("../models/OrderedDish");
const Dish = require("../models/Dish");
const Order = require("../models/Order");
const XLSX = require("xlsx");
const fs = require("fs");
const os = require("os");
const path = require("path");

const handleError = (res, error) => {
  console.error("Error:", error);
  res.status(500).json({ error: error.message });
};

// Добавление доставки
const addDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.create(req.body);
    res.status(201).json(delivery);
  } catch (error) {
    handleError(res, error);
  }
};

// Обновление статуса
const updateStatus = async (req, res) => {
  try {
    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) return res.status(404).json({ error: "Delivery not found" });

    await delivery.update({ status: req.body.status });
    res.json(delivery);
  } catch (error) {
    handleError(res, error);
  }
};

// Просмотр истории заказов клиента
const getCourierHistory = async (req, res) => {
  const courierId = parseInt(req.params.courierId, 10);
  try {
    const deliveries = await Delivery.findAll({
      where: { courierid: courierId },
      include: [
        {
          model: Order,
          attributes: ["totalamount"],
          include: [
            {
              model: Client,
              attributes: ["lastname", "name", "fathername"],
            },
            {
              model: OrderedDish,
              include: [
                {
                  model: Dish,
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!deliveries || deliveries.length === 0) {
      return res.status(404).json({ error: "No deliveries found" });
    }

    const formattedDeliveries = deliveries.map((delivery) => ({
      id: delivery.id,
      deliveryAddress: delivery.deliveryaddress,
      deliveryDate: delivery.deliverydate,
      status: delivery.status,
      totalAmount: delivery.Order.totalamount || 0,
      clientFullName: `${delivery.Order.Client.lastname || ""} ${
        delivery.Order.Client.name || ""
      } ${delivery.Order.Client.fathername || ""}`.trim(),
      orderedDishes: delivery.Order.OrderedDishes.map((orderedDish) => ({
        dishName: orderedDish.Dish ? orderedDish.Dish.name : "Без названия",
        quantity: orderedDish.quantity,
        totalPrice: orderedDish.totalprice,
      })),
    }));

    res.json(formattedDeliveries);
  } catch (error) {
    handleError(res, error);
  }
};

// Скачивание файлов истории курьера
const downloadCourierHistory = async (req, res) => {
  const courierid = parseInt(req.params.courierid, 10);

  try {
    const deliveries = await Delivery.findAll({
      where: { courierid: Number(courierid) },
      include: [
        {
          model: Order,
          attributes: ["totalamount"],
          include: [
            {
              model: Client,
              attributes: ["lastname", "name", "fathername"],
            },
          ],
        },
      ],
    });

    const formattedDeliveries = deliveries.map((delivery) => {
      const order = delivery.Order || {};
      const client = order.Client || {};
      return {
        deliveryAddress: delivery.deliveryaddress,
        deliveryDate: delivery.deliverydate,
        status: delivery.status,
        totalAmount: order.totalamount || 0,
        clientFullName: `${client.lastname || ""} ${client.name || ""} ${
          client.fathername || ""
        }`.trim(),
      };
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(formattedDeliveries);
    XLSX.utils.book_append_sheet(workbook, worksheet, "CourierHistory");

    const downloadsPath = path.join(os.homedir(), "Downloads");
    const filePath = path.join(
      downloadsPath,
      `courier_history_${courierid}.xlsx`
    );

    XLSX.writeFile(workbook, filePath); // Сохраняем в файл

    res.download(filePath, `courier_history_${courierid}.csv`, (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).send("Error downloading file.");
      }
      fs.unlinkSync(filePath); // Удаляем файл после скачки
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Просмотр всех доступных заказов
const allDeliveries = async (req, res) => {
  const { filter } = req.params;

  try {
    const whereClause = {};

    // Условие для фильтрации
    if (filter === "available") {
      whereClause.courierid = null;
    } else if (filter && filter.startsWith("clientid:")) {
      const clientId = filter.split(":")[1];
      whereClause.clientid = Number(clientId);
    } else if (filter && filter.startsWith("courierid:")) {
      const courierId = filter.split(":")[1];
      whereClause.courierid = Number(courierId);
    }
    if (filter !== "all") {
      whereClause.status = { [Op.ne]: "Delivered" };
    }
    const deliveries = await Delivery.findAll({
      where: whereClause,
      include: [
        {
          model: Order,
          attributes: ["totalamount"],
          include: [
            {
              model: Client,
              attributes: ["lastname", "name", "fathername"],
            },
            {
              model: OrderedDish,
              include: [
                {
                  model: Dish,
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
    });

    const formattedDeliveries = deliveries.map((delivery) => {
      const order = delivery.Order || {};
      const client = order.Client || {};
      const orderedDishes = order.OrderedDishes || [];

      return {
        id: delivery.id,
        deliveryAddress: delivery.deliveryaddress,
        deliveryDate: delivery.deliverydate,
        status: delivery.status,
        totalAmount: order.totalamount || 0,
        clientFullName: `${client.lastname || ""} ${client.name || ""} ${
          client.fathername || ""
        }`.trim(),
        orderedDishes: orderedDishes.map((orderedDish) => ({
          dishName: orderedDish.Dish ? orderedDish.Dish.name : "Без названия",
          quantity: orderedDish.quantity,
          totalPrice: orderedDish.totalprice,
        })),
      };
    });

    res.json(formattedDeliveries);
  } catch (error) {
    handleError(res, error);
  }
};

// Сортировка по дате(для свободных доставок, для всех доставок, для доставок определенного курьера)
const sortDeliveriesByDate = async (req, res) => {
  const order = req.query.order || "ASC";
  const filter = req.params.filter;
  try {
    const whereClause = {};

    if (filter === "available") {
      whereClause.courierid = null;
    } else if (filter && filter !== "all") {
      whereClause.courierid = filter;
    }
    if (filter !== "all") {
      whereClause.status = { [Op.ne]: "Delivered" };
    }

    const deliveries = await Delivery.findAll({
      where: whereClause,
      include: [
        {
          model: Order,
          attributes: ["totalamount"],
          include: [
            {
              model: Client,
              attributes: ["lastname", "name", "fathername"],
            },
            {
              model: OrderedDish,
              include: [
                {
                  model: Dish,
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
      order: [["deliverydate", order]],
    });

    // Форматирование данных
    const formattedDeliveries = deliveries.map((delivery) => ({
      id: delivery.id,
      deliveryAddress: delivery.deliveryaddress,
      deliveryDate: delivery.deliverydate,
      status: delivery.status,
      totalAmount: delivery.Order.totalamount || 0,
      clientFullName: `${delivery.Order.Client.lastname || ""} ${
        delivery.Order.Client.name || ""
      } ${delivery.Order.Client.fathername || ""}`.trim(),
      orderedDishes: delivery.Order.OrderedDishes.map((orderedDish) => ({
        dishName: orderedDish.Dish ? orderedDish.Dish.name : "Без названия",
        quantity: orderedDish.quantity,
        totalPrice: orderedDish.totalprice,
      })),
    }));

    res.json(formattedDeliveries);
  } catch (error) {
    handleError(res, error);
  }
};

// Сортировка по цене(для свободных доставок, для всех доставок, для доставок определенного курьера)
const sortDeliveriesByPrice = async (req, res) => {
  const order = req.query.order || "ASC";
  const filter = req.params.filter;
  try {
    const whereClause = {};

    if (filter === "available") {
      whereClause.courierid = null;
    } else if (filter && filter !== "all") {
      whereClause.courierid = filter;
    }
    if (filter !== "all") {
      whereClause.status = { [Op.ne]: "Delivered" };
    }
    const deliveries = await Delivery.findAll({
      where: whereClause,
      include: [
        {
          model: Order,
          attributes: ["totalamount"],
          include: [
            {
              model: Client,
              attributes: ["lastname", "name", "fathername"],
            },
            {
              model: OrderedDish,
              include: [
                {
                  model: Dish,
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
      order: [[{ model: Order, as: "Order" }, "totalamount", order]],
    });

    // Форматирование данных
    const formattedDeliveries = deliveries.map((delivery) => ({
      id: delivery.id,
      deliveryAddress: delivery.deliveryaddress,
      deliveryDate: delivery.deliverydate,
      status: delivery.status,
      totalAmount: delivery.Order.totalamount || 0,
      clientFullName: `${delivery.Order.Client.lastname || ""} ${
        delivery.Order.Client.name || ""
      } ${delivery.Order.Client.fathername || ""}`.trim(),
      orderedDishes: delivery.Order.OrderedDishes.map((orderedDish) => ({
        dishName: orderedDish.Dish ? orderedDish.Dish.name : "Без названия",
        quantity: orderedDish.quantity,
        totalPrice: orderedDish.totalprice,
      })),
    }));

    res.json(formattedDeliveries);
  } catch (error) {
    handleError(res, error);
  }
};

// Удаление доставки(с условием)
const deletetDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery)
      return res.status(404).json({ message: "Delivery not found" });
    if (delivery.status !== "Adding an order") {
      return res
        .status(400)
        .json({ message: "Cannot delete delivery with current status" });
    }
    await delivery.destroy();
    res.json({ message: "Delivery deleted" });
  } catch (error) {
    handleError(res, error);
  }
};

// Получение информации о доставке
const getDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findByPk(req.params.id, {
      include: [
        {
          model: Order,
          include: [
            {
              model: Client,
              attributes: ["lastname", "name", "fathername", "address"],
            },
            {
              model: OrderedDish,
              include: {
                model: Dish,
                attributes: ["name", "price"],
              },
              attributes: ["quantity"],
            },
          ],
        },
        {
          model: Courier,
          attributes: ["lastname", "name", "phone"],
        },
      ],
    });

    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    // Формируем ответ с нужной информацией
    const deliveryInfo = {
      clientLastName: delivery.Order.Client.lastname,
      clientName: delivery.Order.Client.name,
      clientFatherName: delivery.Order.Client.fathername,
      clientAddress: delivery.Order.Client.address,
      courierLastName: delivery.Courier.lastname,
      courierName: delivery.Courier.name,
      courierPhone: delivery.Courier.phone,
      dishes: delivery.Order.OrderedDishes.map((dish) => ({
        name: dish.Dish.name,
        quantity: dish.quantity,
        price: dish.Dish.price,
        total: dish.quantity * dish.Dish.price,
      })),
      totalPrice: delivery.Order.OrderedDishes.reduce(
        (sum, dish) => sum + dish.quantity * dish.Dish.price,
        0
      ),
    };

    res.json(deliveryInfo);
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  addDelivery,
  updateStatus,
  getCourierHistory,
  downloadCourierHistory,
  allDeliveries,
  sortDeliveriesByDate,
  sortDeliveriesByPrice,
  deletetDelivery,
  getDelivery,
};

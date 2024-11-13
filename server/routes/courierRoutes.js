const express = require("express");
const Courier = require("../models/Courier");
const Delivery = require("../models/Delivery");
const Order = require("../models/Order");
const OrderedDish = require("../models/OrderedDish");
const Client = require("../models/Client");
const Dish = require("../models/Dish");
const router = express.Router();

//Создание курьера
router.post("/", async (req, res) => {
  try {
    const courier = await Courier.create(req.body);
    res.status(201).json(courier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получение информации о курьере
router.get("/:id", async (req, res) => {
  try {
    const courier = await Courier.findByPk(req.params.id, {
      attributes: { exclude: ["id", "createdAt"] },
    });
    if (courier) res.json(courier);
    else res.status(404).json({ message: "Courier not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обновление информации о курьере
router.put("/:id", async (req, res) => {
  try {
    const { email, id, createdAt, ...updates } = req.body;
    const courier = await Courier.update(updates, {
      where: { id: req.params.id },
    });
    res.json(courier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Изменение статуса доступности курьера
router.put("/:id/status", async (req, res) => {
  try {
    const courier = await Courier.findByPk(req.params.id);
    if (courier) {
      courier.available = !courier.available; // Меняем доступность на противоположную
      await courier.save(); // Сохраняем обновление
      res.json({
        message: "Courier availability status updated",
        available: courier.available,
      });
    } else {
      res.status(404).json({ message: "Courier not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Просмотр всех доступных заказов
router.get("/deliveries/available", async (req, res) => {
  try {
    const deliveries = await Delivery.findAll({
      where: { courierid: null },
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
    console.error("Ошибка на сервере:", error);
    res.status(500).json({ error: error.message });
  }
});

// Сортировка по дате
router.get("/deliveries/sortByDate", async (req, res) => {
  const order = req.query.order || "ASC"; // По умолчанию по возрастанию
  try {
    const deliveries = await Delivery.findAll({
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
    console.error("Ошибка на сервере:", error);
    res.status(500).json({ error: error.message });
  }
});

// Сортировка по цене
router.get("/deliveries/sortByPrice", async (req, res) => {
  const order = req.query.order || "ASC"; // По умолчанию по возрастанию
  try {
    const deliveries = await Delivery.findAll({
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
      order: [[{ model: Order, as: "Order" }, "totalamount", order]], // Используйте переменную order
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
    console.error("Ошибка на сервере:", error);
    res.status(500).json({ error: error.message });
  }
});

// Принятие заказа курьером
router.put("/:id/takeOrder/:DeliveryId", async (req, res) => {
  try {
    const courier = await Courier.findByPk(req.params.id);
    const delivery = await Delivery.findByPk(req.params.DeliveryId);

    if (!courier) {
      return res.status(404).json({ message: "Courier not found" });
    }

    if (!delivery) {
      return res.status(404).json({ message: "Delivery order not found" });
    }

    if (delivery.courierid !== null) {
      return res.status(400).json({
        message: "This order has already been taken by another courier",
      });
    }

    // Присваиваем курьеру заказ
    delivery.courierid = courier.id;
    await delivery.save();

    res.json({ message: "Order accepted by courier", delivery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удаление курьера по id
router.delete("/:id", async (req, res) => {
  try {
    await Courier.destroy({ where: { id: req.params.id } });
    res.json({ message: "Courier deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

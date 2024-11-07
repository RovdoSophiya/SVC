const express = require("express");
const router = express.Router();
const Delivery = require("../models/Delivery");
const Client = require("../models/Client");
const Courier = require("../models/Courier");
const OrderedDish = require("../models/OrderedDish");
const Dish = require("../models/Dish");
const Order = require("../models/Order");

// Добавление доставки
router.post("/", async (req, res) => {
  try {
    const delivery = await Delivery.create(req.body);
    res.status(201).json(delivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обновление статуса
router.patch("/:id/status", async (req, res) => {
  try {
    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) return res.status(404).json({ error: "Delivery not found" });

    await delivery.update({ status: req.body.status });
    res.json(delivery);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Удаление доставки(с условием)
router.delete("/:id", async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
});

// Получение информации о доставке
router.get("/:id", async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require("express");
const Courier = require("../models/Courier");
const Delivery = require("../models/Delivery");
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

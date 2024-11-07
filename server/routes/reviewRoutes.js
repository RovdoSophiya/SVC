const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Client = require("../models/Client");
const Order = require("../models/Order");

// Добавление отзыва
router.post("/", async (req, res) => {
  try {
    const { clientid, orderid, rating, comment } = req.body;

    // Проверка на существование клиента
    const client = await Client.findByPk(clientid);
    if (!client) {
      return res.status(400).json({ message: "Client not found" });
    }

    // Проверка на существование заказа
    const order = await Order.findByPk(orderid);
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }

    // Проверка рейтинга
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    // Проверка текста отзыва
    if (comment.length > 700) {
      return res
        .status(400)
        .json({ message: "Review text cannot exceed 700 characters" });
    }

    // Создание отзыва
    const review = await Review.create({
      clientid,
      orderid,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Редактирование отзыва
router.put("/:id", async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    const { rating, comment } = req.body;

    if (rating < 1 || rating > 5)
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    if (comment.length > 700)
      return res
        .status(400)
        .json({ message: "Review text cannot exceed 700 characters" });

    await review.update(req.body);
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удаление отзыва
router.delete("/:id", async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    await review.destroy();
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

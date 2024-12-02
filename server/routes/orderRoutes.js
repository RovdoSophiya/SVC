const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");

// Добавление заказа
router.post("/", OrderController.addOrder);

// Удаление заказа
router.delete("/:id", OrderController.deleteOrder);

// Получение истории заказов с пагинацией и сортировкой
router.get("/", OrderController.getClientOrders);

module.exports = router;

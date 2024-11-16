const express = require("express");
const router = express.Router();
const OrderedDishController = require("../controllers/orderedDishController");

// Добавление заказанного блюда
router.post("/", OrderedDishController.addOrderedDish);

// Удаление заказанного блюда
router.delete("/:id", OrderedDishController.deleteOrderedDish);

module.exports = router;

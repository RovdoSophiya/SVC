const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");

// Добавление заказа
router.post("/", OrderController.addOrder);

// Удаление заказа
router.delete("/:id", OrderController.deleteOrder);

// Получение истории заказов с пагинацией и сортировкой
router.get("/", OrderController.getClientOrders);

// Получение текущих аказов с пагинацией и сортировкой
router.get("/current", OrderController.getCurrentClientOrders);

//Скачивание файлов
router.get("/excel", OrderController.downloadOrdersExcel);

router.get(
  "/getWithoutReviews/:clientid",
  OrderController.getCompletedDeliveriesWithoutReview
);

module.exports = router;

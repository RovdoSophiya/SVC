const express = require("express");
const router = express.Router();
const DeliveryController = require("../controllers/deliveryController");

// Добавление доставки
router.post("/", DeliveryController.addDelivery);

// Обновление статуса
router.patch("/:id/status", DeliveryController.updateStatus);

// Просмотр истории заказов клиента
router.get("/courier/history/:courierId", DeliveryController.getCourierHistory);

// Скачивание файлов истории курьера
router.get(
  "/courier/history/download/:courierid",
  DeliveryController.downloadCourierHistory
);

// Просмотр всех доступных заказов
router.get("/search/:filter?", DeliveryController.allDeliveries);

// Сортировка по дате(для свободных доставок, для всех доставок, для доставок определенного курьера)
router.get(
  "/sort/sortByDate/:filter?",
  DeliveryController.sortDeliveriesByDate
);

// Сортировка по цене(для свободных доставок, для всех доставок, для доставок определенного курьера)
router.get(
  "/sort/sortByPrice/:filter?",
  DeliveryController.sortDeliveriesByPrice
);

// Получение информации о доставке
router.get("/:id", DeliveryController.getDelivery);

router.get("/get/completed", DeliveryController.getDeliveredOrders);

module.exports = router;

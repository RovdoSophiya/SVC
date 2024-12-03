const express = require("express");
const router = express.Router();
const CourierController = require("../controllers/courierController");

// Создание курьера
router.post("/", CourierController.createCourier);

// Получение информации о курьере
router.get("/:id", CourierController.getCourierById);

// Обновление информации о курьере
router.put("/:id", CourierController.updateCourier);

// Изменение статуса доступности курьера
router.put("/:id/status", CourierController.toggleAvailability);

// Принятие заказа курьером
router.put("/:id/takeOrder/:DeliveryId", CourierController.takeOrder);

// Удаление курьера по id
router.delete("/:id", CourierController.deleteCourier);

// Поиск телефона
router.get("/check/checkPhoneExists", CourierController.checkPhoneExists);

module.exports = router;

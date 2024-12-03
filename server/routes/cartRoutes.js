const express = require("express");
const router = express.Router();
const СartController = require("../controllers/cartController");

// Получение всех товаров в корзине для конкретного клиента
router.get("/:clientid", СartController.getCartItems);

// Добавление товара в корзину
router.post("/add", СartController.addToCart);

// Удаление товара из корзины
router.delete("/:clientid/:dishid", СartController.removeFromCart);

// Подсчет суммы корзины для конкретного клиента
router.get("/total/:clientid", СartController.calculateTotalPrice);

// Заказ блюд из корзины
router.post("/order/:clientid", СartController.orderCartItems);

router.get("/:clientid", СartController.getCartItems);

router.put("/:clientid/:dishid/increase", СartController.increaseItemCount);

router.put("/:clientid/:dishid/decrease", СartController.decreaseItemCount);

module.exports = router;

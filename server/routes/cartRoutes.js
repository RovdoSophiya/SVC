const express = require("express");
const router = express.Router();
const СartController = require("../controllers/cartController");

// Добавление товара в корзину
router.post("/", СartController.addToCart);

// Увеличение количества товара в корзине
router.patch("/:id/increase-quantity", СartController.increaseQuantity);

// Уменьшение количества товара в корзине
router.patch("/:id/decrease-quantity", СartController.decreaseQuantity);

// Удаление товара из корзины
router.delete("/:id", СartController.removeFromCart);

// Подсчет суммы корзины для конкретного клиента
router.get("/total/:clientid", СartController.getCartTotal);

// Заказ блюд из корзины
router.post("/order", СartController.orderCartItems);

module.exports = router;

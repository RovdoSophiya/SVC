const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Dish = require("../models/Dish");
const OrderedDish = require("../models/OrderedDish");
const Order = require("../models/Order");

// Добавление товара в корзину
router.post("/", async (req, res) => {
  try {
    const { clientid, dishid, count } = req.body;

    // Проверяем, есть ли блюдо с таким ID в базе данных
    const dish = await Dish.findByPk(dishid);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" }); // Ошибка, если блюдо не найдено
    }

    if (count <= 0) {
      return res.status(400).json({ message: "Count must be greater than 0" }); // Ошибка, если количество <= 0
    }

    // Вычисляем цену на основе количества
    const price = dish.price * count;

    // Создаем новый элемент корзины
    const cartItem = await Cart.create({ clientid, dishid, count, price });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Ошибка сервера
  }
});

// Увеличение количества товара и обновление цены в корзине
router.patch("/:id/increase-quantity", async (req, res) => {
  try {
    const cartItem = await Cart.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" }); // Ошибка, если товар не найден в корзине
    }

    const dish = await Dish.findByPk(cartItem.dishid);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" }); // Ошибка, если блюдо не найдено
    }

    // Обновляем количество и цену
    const newCount = cartItem.count + 1;
    const newPrice = newCount * dish.price;
    await cartItem.update({ count: newCount, price: newPrice });

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Ошибка сервера
  }
});

// Уменьшение количества товара и обновление цены в корзине
router.patch("/:id/decrease-quantity", async (req, res) => {
  try {
    const cartItem = await Cart.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ message: "Item not found" }); // Ошибка, если товар не найден
    }
    if (cartItem.count <= 1) {
      return res
        .status(400)
        .json({ message: "Cannot decrease quantity below 1" }); // Ошибка, если количество <= 1
    }

    // Обновляем количество и цену
    const newCount = cartItem.count - 1;
    const newPrice = (newCount * cartItem.price) / cartItem.count;
    await cartItem.update({ count: newCount, price: newPrice });

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Ошибка сервера
  }
});

// Удаление товара из корзины
router.delete("/:id", async (req, res) => {
  try {
    const cartItem = await Cart.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ message: "Item not found" }); // Ошибка, если товар не найден
    }

    // Удаляем товар из корзины
    await cartItem.destroy();
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Ошибка сервера
  }
});

// Подсчет суммы корзины для конкретного клиента
router.get("/total/:clientid", async (req, res) => {
  try {
    const { clientid } = req.params; // Получаем clientid из параметров URL

    // Находим все товары в корзине для указанного клиента
    const cartItems = await Cart.findAll({ where: { clientid } });

    // if (cartItems.length === 0) {
    //   return res.status(400).json({ message: "Cart is empty" }); // Ошибка, если корзина пуста
    // }

    if (cartItems.length === 0) {
      return res.json({ total: 0 });
    }

    // Вычисляем общую сумму
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    res.json({ total: totalPrice });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Ошибка сервера
  }
});

// Заказ блюд
router.post("/order", async (req, res) => {
  try {
    const { clientId } = req.body;
    if (!clientId) {
      return res.status(400).json({ message: "Client ID is required" }); // Ошибка, если не передан clientId
    }

    // Находим все товары в корзине для указанного клиента
    const cartItems = await Cart.findAll({ where: { clientid: clientId } });
    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" }); // Ошибка, если корзина пуста
    }

    const totalamount = cartItems.reduce((sum, item) => sum + item.price, 0);

    if (!totalamount) {
      return res.status(400).json({ message: "Total amount cannot be zero" });
    }

    const order = await Order.create({
      clientid: clientId,
      orderedDate: new Date(),
      totalamount: totalamount,
    });

    for (const item of cartItems) {
      await OrderedDish.create({
        orderid: order.id,
        dishid: item.dishid,
        quantity: item.count,
        totalprice: item.price,
      });
      await item.destroy(); // Удаляем товар из корзины после переноса
    }

    res.json({ message: "Cart ordered successfully", orderId: order.id });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Ошибка сервера
  }
});

module.exports = router;

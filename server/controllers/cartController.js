const Cart = require("../models/Cart");
const Client = require("../models/Client");
const Dish = require("../models/Dish");
const OrderedDish = require("../models/OrderedDish");
const Order = require("../models/Order");
const Delivery = require("../models/Delivery");

const handleError = (res, error) => {
  console.error("Error:", error);
  res.status(500).json({ error: error.message });
};

// Получение всех товаров из корзины по clientId
const getCartItems = async (req, res) => {
  const { clientid } = req.params;

  try {
    const cartItems = await Cart.findAll({
      where: { clientid: clientid },
      include: [{ model: Dish, attributes: ["name", "type", "photo"] }],
    });

    const response = cartItems.map((item) => ({
      id: item.id,
      dishid: item.dishid,
      clientid: item.clientid,
      count: item.count,
      price: item.price,
      dish: {
        name: item.Dish.name,
        type: item.Dish.type,
        photo: item.Dish.photo,
      },
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Error in cart" });
  }
};

// Добавление товара в корзину
const addToCart = async (req, res) => {
  try {
    const { clientid, dishid, count } = req.body;

    // Проверяем, есть ли блюдо с таким ID в базе данных
    const dish = await Dish.findByPk(dishid);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    if (count <= 0) {
      return res.status(400).json({ message: "Count must be greater than 0" });
    }
    // Проверяем, существует ли товар уже в корзине
    const existingItem = await Cart.findOne({
      where: { clientid, dishid },
    });

    if (existingItem) {
      existingItem.count += count;
      existingItem.price = existingItem.count * dish.price;
      await existingItem.save();
      return res.json(existingItem);
    } else {
      const price = dish.price * count;
      const cartItem = await Cart.create({ clientid, dishid, count, price });
      return res.status(201).json(cartItem);
    }
  } catch (error) {
    handleError(res, error);
  }
};

// Увеличение количества товара в корзине
const increaseItemCount = async (req, res) => {
  const { clientid, dishid } = req.params;

  try {
    console.log(
      `Запрос на увеличение количества для clientId: ${clientid}, dishId: ${dishid}`
    );
    const cartItem = await Cart.findOne({
      where: { clientid: clientid, dishid: dishid },
      include: [{ model: Dish, attributes: ["price"] }],
    });

    if (cartItem) {
      cartItem.count += 1;
      const dishPrice = cartItem.Dish.price;
      cartItem.price = cartItem.count * dishPrice; // Пересчет цены
      await cartItem.save();
      res.json(cartItem);
    } else {
      res.status(404).json({ error: "Товар не найден в корзине" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка увеличения количества товара" });
  }
};

// Уменьшение количества товара в корзине
const decreaseItemCount = async (req, res) => {
  const { clientid, dishid } = req.params;

  try {
    const cartItem = await Cart.findOne({
      where: { clientid: clientid, dishid: dishid },
      include: [{ model: Dish, attributes: ["price"] }],
    });

    if (cartItem) {
      if (cartItem.count > 1) {
        cartItem.count -= 1;
        const dishPrice = cartItem.Dish.price;
        cartItem.price = cartItem.count * dishPrice;
        await cartItem.save();
        res.json(cartItem);
      } else {
        res.status(400).json({ error: "Количество не может быть меньше 1" });
      }
    } else {
      res.status(404).json({ error: "Товар не найден в корзине" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка уменьшения количества товара" });
  }
};

// Удаление товара из корзины
const removeFromCart = async (req, res) => {
  const { clientid, dishid } = req.params;
  try {
    const cartItem = await Cart.findOne({
      where: {
        dishid: dishid,
        clientid: clientid,
      },
    });
    if (!cartItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    await cartItem.destroy();
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    handleError(res, error);
  }
};

// Расчет полной суммы товаров в корзине для конкретного клиента
const calculateTotalPrice = async (req, res) => {
  const { clientid } = req.params;

  try {
    const cartItems = await Cart.findAll({ where: { clientid } });

    if (cartItems.length === 0) {
      return res.json({ total: 0 });
    }

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    res.json({ total: totalPrice });
  } catch (error) {
    res.status(500).json({ error: "Ошибка расчета полной суммы корзины" });
  }
};

// Заказ блюд
const orderCartItems = async (req, res) => {
  try {
    const { clientid } = req.params;
    const client = await Client.findByPk(clientid);
    if (!clientid) {
      return res.status(400).json({ message: "Client ID is required" });
    }

    // Находим все товары в корзине для указанного клиента
    const cartItems = await Cart.findAll({ where: { clientid: clientid } });
    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalamount = cartItems.reduce((sum, item) => sum + item.price, 0);

    if (!totalamount) {
      return res.status(400).json({ message: "Total amount cannot be zero" });
    }

    const order = await Order.create({
      clientid: clientid,
      ordereddate: new Date(),
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

    const delivery = await Delivery.create({
      orderid: order.id,
      courierid: null,
      deliveryaddress: client.address,
      deliverydate: new Date(),
      status: "Pending",
    });

    res.json({
      message: "Cart ordered successfully",
      orderId: order.id,
    });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getCartItems,
  addToCart,
  calculateTotalPrice,
  removeFromCart,
  orderCartItems,
  increaseItemCount,
  decreaseItemCount,
};

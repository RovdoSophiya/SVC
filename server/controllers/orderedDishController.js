const OrderedDish = require("../models/OrderedDish");
const Dish = require("../models/Dish");

const handleError = (res, error) => {
  console.error("Error:", error);
  res.status(500).json({ error: error.message });
};

// Добавление заказанного блюда
const addOrderedDish = async (req, res) => {
  try {
    const { orderid, dishid, quantity } = req.body;

    const dish = await Dish.findByPk(dishid);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    // Рассчитываем общую стоимость
    const totalprice = dish.price * quantity;

    const orderedDish = await OrderedDish.create({
      orderid,
      dishid,
      quantity,
      totalprice,
    });

    res.status(201).json(orderedDish);
  } catch (error) {
    handleError(res, error);
  }
};

// Удаление заказанного блюда
const deleteOrderedDish = async (req, res) => {
  try {
    const orderedDish = await OrderedDish.findByPk(req.params.id);

    if (!orderedDish) {
      return res.status(404).json({ message: "Ordered dish not found" });
    }

    await orderedDish.destroy();
    res.json({ message: "Ordered dish deleted" });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  addOrderedDish,
  deleteOrderedDish,
};

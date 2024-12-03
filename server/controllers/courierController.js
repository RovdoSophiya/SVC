const Courier = require("../models/Courier");
const Delivery = require("../models/Delivery");
const { Op } = require("sequelize");

const handleError = (res, error) => {
  console.error("Error:", error);
  res.status(500).json({ error: error.message });
};

//Создание курьера
const createCourier = async (req, res) => {
  try {
    const courier = await Courier.create(req.body);
    res.status(201).json(courier);
  } catch (error) {
    handleError(res, error);
  }
};

// Получение информации о курьере
const getCourierById = async (req, res) => {
  try {
    const courier = await Courier.findByPk(req.params.id, {
      attributes: { exclude: ["id", "createdAt"] },
    });
    if (courier) res.json(courier);
    else res.status(404).json({ message: "Courier not found" });
  } catch (error) {
    handleError(res, error);
  }
};

// Обновление информации о курьере
const updateCourier = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, id: courierId, createdAt, ...updates } = req.body;

    const [updated] = await Courier.update(updates, {
      where: { id },
    });

    if (updated) {
      const updatedCourier = await Courier.findByPk(id);
      return res.json(updatedCourier);
    } else {
      return res.status(404).json({ error: "Courier not found." });
    }
  } catch (error) {
    handleError(res, error);
  }
};
// Изменение статуса доступности курьера
const toggleAvailability = async (req, res) => {
  try {
    const courier = await Courier.findByPk(req.params.id);
    if (courier) {
      courier.available = !courier.available; // Меняем доступность на противоположную
      await courier.save(); // Сохраняем обновление
      res.json({
        message: "Courier availability status updated",
        available: courier.available,
      });
    } else {
      res.status(404).json({ message: "Courier not found" });
    }
  } catch (error) {
    handleError(res, error);
  }
};

// Принятие заказа курьером
const takeOrder = async (req, res) => {
  try {
    const courier = await Courier.findByPk(req.params.id);
    const delivery = await Delivery.findByPk(req.params.DeliveryId);

    if (!courier) {
      return res.status(404).json({ message: "Courier not found" });
    }

    if (!delivery) {
      return res.status(404).json({ message: "Delivery order not found" });
    }

    if (delivery.courierid !== null) {
      return res.status(400).json({
        message: "This order has already been taken by another courier",
      });
    }

    // Присваиваем курьеру заказ
    delivery.courierid = courier.id;
    await delivery.save();

    res.json({ message: "Order accepted by courier", delivery });
  } catch (error) {
    handleError(res, error);
  }
};

// Удаление курьера по id
const deleteCourier = async (req, res) => {
  try {
    const deleted = await Courier.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: "Courier deleted successfully" });
    } else {
      res.status(404).json({ message: "Courier not found" });
    }
  } catch (error) {
    handleError(res, error);
  }
};

// Проверка существования номера телефона
const checkPhoneExists = async (req, res) => {
  try {
    const { phone, courierid } = req.query;
    const courier = await Courier.findOne({
      where: {
        phone: phone,
        id: { [Op.ne]: courierid },
      },
    });

    if (courier) {
      return res.json({ exists: true });
    }

    return res.json({ exists: false });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCourier,
  getCourierById,
  updateCourier,
  toggleAvailability,
  takeOrder,
  deleteCourier,
  checkPhoneExists,
};

const Courier = require("../models/Courier");
const Delivery = require("../models/Delivery");

class CourierController {
  //Создание курьера
  async createCourier(req, res) {
    try {
      const courier = await Courier.create(req.body);
      res.status(201).json(courier);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Получение информации о курьере
  async getCourierById(req, res) {
    try {
      const courier = await Courier.findByPk(req.params.id, {
        attributes: { exclude: ["id", "createdAt"] },
      });
      if (courier) res.json(courier);
      else res.status(404).json({ message: "Courier not found" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Обновление информации о курьере
  async updateCourier(req, res) {
    await body("name").notEmpty().withMessage("Name is required.").run(req);
    await body("lastname")
      .notEmpty()
      .withMessage("Last name is required.")
      .run(req);
    await body("email")
      .isEmail()
      .withMessage("Valid email is required.")
      .run(req);
    await body("phone")
      .isNumeric()
      .withMessage("Phone must contain only digits.")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, id, createdAt, ...updates } = req.body;
      const [updated] = await Courier.update(updates, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedCourier = await Courier.findByPk(req.params.id);
        res.json(updatedCourier);
      } else {
        res.status(404).json({ message: "Courier not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Изменение статуса доступности курьера
  async toggleAvailability(req, res) {
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
      res.status(500).json({ error: error.message });
    }
  }
  // Принятие заказа курьером
  async takeOrder(req, res) {
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
      res.status(500).json({ error: error.message });
    }
  }
  // Удаление курьера по id
  async deleteCourier(req, res) {
    try {
      const deleted = await Courier.destroy({ where: { id: req.params.id } });
      if (deleted) {
        res.json({ message: "Courier deleted successfully" });
      } else {
        res.status(404).json({ message: "Courier not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = new CourierController();

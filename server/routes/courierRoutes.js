const express = require("express");
const {
  createCourier,
  getCourierById,
  updateCourier,
  deleteCourier,
} = require("../models/courierModel");
const router = express.Router();

//Создание курьера
router.post("/", async (req, res) => {
  try {
    const newCourier = await createCourier(req.body);
    res.status(201).json(newCourier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получение информации о курьере
router.get("/:id", async (req, res) => {
  try {
    const courier = await getCourierById(req.params.id);
    if (!courier) return res.status(404).json({ error: "Courier not found" });
    res.json(courier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обновление информации о курьере
router.put("/:id", async (req, res) => {
  try {
    const updatedCourier = await updateCourier(req.params.id, req.body);
    res.json(updatedCourier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удаление клиента по id
router.delete("/:id", async (req, res) => {
  try {
    const deletedCourier = await deleteCourier(req.params.id);
    res.json({
      message: "Courier deleted successfully",
      courier: deletedCourier,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

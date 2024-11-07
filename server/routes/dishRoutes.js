const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Dish = require("../models/Dish");

// Добавление блюда
router.post("/", async (req, res) => {
  try {
    const dish = await Dish.create(req.body);
    res.status(201).json(dish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удаление блюда
router.delete("/:id", async (req, res) => {
  try {
    const dish = await Dish.findByPk(req.params.id);
    if (!dish) return res.status(404).json({ message: "Dish not found" });
    await dish.destroy();
    res.json({ message: "Dish deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Фильтрация по категории
router.get("/filter/category", async (req, res) => {
  try {
    const { category } = req.query;
    const dishes = await Dish.findAll({ where: { category } });
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Фильтрация по цене
router.get("/filter/price", async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    const dishes = await Dish.findAll({
      where: { price: { [Op.between]: [minPrice, maxPrice] } },
    });
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Фильтрация по требованиям
router.get("/filter/requirements", async (req, res) => {
  try {
    const { requirement } = req.query;
    const dishes = await Dish.findAll({ where: { requirements: requirement } });
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получение информации по id
router.get("/:id", async (req, res) => {
  try {
    const dish = await Dish.findByPk(req.params.id);
    if (!dish) return res.status(404).json({ message: "Dish not found" });
    res.json(dish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получение информации по имени
router.get("/name/:name", async (req, res) => {
  try {
    const dish = await Dish.findOne({ where: { name: req.params.name } });
    if (!dish) return res.status(404).json({ message: "Dish not found" });
    res.json(dish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

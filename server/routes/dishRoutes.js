const express = require("express");
const {
  createDish,
  getDishById,
  getDishByName,
  updateDish,
  deleteDish,
  filterDishesByCategory,
  filterDishesByPriceRange,
  filterDishesByDietaryRequirement,
} = require("../models/dishModel");
const router = express.Router();

//Создание блюда
router.post("/", async (req, res) => {
  try {
    const newDish = await createDish(req.body);
    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получение информации о блюде по id
router.get("/id/:id", async (req, res) => {
  try {
    const dish = await getDishById(req.params.id);
    if (!dish) return res.status(404).json({ error: "Dish not found" });
    res.json(dish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получение информации о блюде по имени
router.get("/name/:name", async (req, res) => {
  try {
    const dish = await getDishByName(req.params.name);
    if (!dish) return res.status(404).json({ error: "Dish not found" });
    res.json(dish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обновление информации о блюде
router.put("/:id", async (req, res) => {
  try {
    const updatedDish = await updateDish(req.params.id, req.body);
    res.json(updatedDish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удаление блюда по id
router.delete("/:id", async (req, res) => {
  try {
    const deletedDish = await deleteDish(req.params.id);
    res.json({
      message: "Dish deleted successfully",
      Dish: deletedDish,
    });
  } catch (error) {
    if (error.message === "Dish not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

// Фильтрация блюд по категории
router.get("/filter/category/:category", async (req, res) => {
  try {
    const dishes = await filterDishesByCategory(req.params.category);
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Фильтрация блюд по цене (от и до)
router.get("/filter/price", async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  try {
    const dishes = await filterDishesByPriceRange(minPrice, maxPrice);
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Фильтрация блюд по диетическим требованиям ("веганский", "без глютена")
router.get("/filter/dietary", async (req, res) => {
  const { dietaryFilter } = req.query;
  try {
    const dishes = await filterDishesByDietaryRequirement(dietaryFilter);
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

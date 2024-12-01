const express = require("express");
const router = express.Router();
const DishController = require("../controllers/dishController");

// Добавление блюда
router.post("/", DishController.addDish);

// Удаление блюда
router.delete("/:id", DishController.deleteDish);

// // Фильтрация по категории
// router.get("/filter/category", DishController.filterByCategory);

// // Фильтрация по цене
// router.get("/filter/price", DishController.filterByPrice);

// // Фильтрация по требованиям
// router.get("/filter/requirements", DishController.filterByRequirements);

// Получение информации по id
router.get("/:id", DishController.getDishById);

// Получение информации по имени
router.get("/name/:name", DishController.getDishByName);

// Получение отфильтрованных блюд
router.get("/", DishController.getFilteredDishes);

module.exports = router;

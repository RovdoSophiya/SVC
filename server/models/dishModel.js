const pool = require("../db");

// Создание нового блюда
const createDish = async (dishData) => {
  const { name, description, price, filter, category } = dishData;

  try {
    const query = `
      INSERT INTO "Dish" (name, description, price, filter, category, createdAt)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *;
    `;
    const values = [name, description, price, filter, category];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Получение информации о блюде по ID
const getDishById = async (dishId) => {
  const query = `SELECT * FROM "Dish" WHERE "id" = $1;`;
  const result = await pool.query(query, [dishId]);
  return result.rows[0];
};

// Получение информации о блюде по имени
const getDishByName = async (dishName) => {
  const query = `SELECT * FROM "Dish" WHERE "name" = $1;`;
  const result = await pool.query(query, [dishName]);
  return result.rows[0];
};

// Редактрование блюда (кроме даты добавления и ID)
const updateDish = async (dishId, updateData) => {
  const { name, description, price, filter, category } = updateData;

  const query = `
    UPDATE "Dish"
    SET name = $1, description = $2, price = $3, filter = $4, category = $5
    WHERE id = $6
    RETURNING *;
  `;
  const values = [name, description, price, filter, category, dishId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Удаление блюда
const deleteDish = async (dishId) => {
  const existingDish = await getDishById(dishId);
  if (!existingDish) {
    throw new Error("Dish not found"); // Если не найдено, выбрасываем ошибку
  }

  const query = `DELETE FROM "Dish" WHERE id = $1;`;
  await pool.query(query, [dishId]);
  return existingDish;
};

// Фильтрация блюд по категории
const filterDishesByCategory = async (category) => {
  const query = `SELECT * FROM "Dish" WHERE category = $1;`;
  const result = await pool.query(query, [category]);
  return result.rows;
};

// Фильтрация блюд по цене (от и до)
const filterDishesByPriceRange = async (minPrice, maxPrice) => {
  const query = `
    SELECT * FROM "Dish"
    WHERE price BETWEEN $1 AND $2;
  `;
  const result = await pool.query(query, [minPrice, maxPrice]);
  return result.rows;
};

// Фильтрация блюд по диетическим требованиям ("веганский", "без глютена")
const filterDishesByDietaryRequirement = async (dietaryFilter) => {
  const query = `
    SELECT * FROM "Dish"
    WHERE filter = $1;
  `;
  const result = await pool.query(query, [dietaryFilter]);
  return result.rows;
};

module.exports = {
  createDish,
  getDishById,
  getDishByName,
  updateDish,
  deleteDish,
  filterDishesByCategory,
  filterDishesByPriceRange,
  filterDishesByDietaryRequirement,
};

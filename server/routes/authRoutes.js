const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Client = require("../models/Client");
const Courier = require("../models/Courier");

// Регистрация клиента
router.post("/register", async (req, res) => {
  const { email, password, name, lastname, fathername, phone, address } =
    req.body;

  try {
    // Проверка на существующий email в обеих таблицах
    const existingClient = await Client.findOne({ where: { email } });
    const existingCourier = await Courier.findOne({ where: { email } });

    if (existingClient || existingCourier) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового клиента
    const newClient = await Client.create({
      email,
      password: hashedPassword,
      name,
      lastname,
      fathername: fathername || null, // Если отчество не введено, то null
      phone,
      address,
    });

    res.status(201).json({ message: "Client registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Авторизация
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Проверка, существует ли пользователь как клиент или курьер
    let user = await Client.findOne({ where: { email } });
    let role = "client"; // Устанавливаем роль по умолчанию как "client"

    if (!user) {
      user = await Courier.findOne({ where: { email } });
      role = "courier"; // Если не найден клиент, ищем курьера
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Возвращаем успешный ответ с ролью и данными пользователя
    res
      .status(200)
      .json({
        message: "Login successful",
        role,
        user: { id: user.id, email: user.email, name: user.name },
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require("express");
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
    const existingPhone = await Client.findOne({ where: { phone } });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone already exists." });
    }
    // Создание нового клиента
    const newClient = await Client.create({
      email,
      password,
      name,
      lastname,
      fathername: fathername || null,
      phone,
      address,
    });

    // Возвращаем идентификатор и роль нового клиента
    res.status(201).json({
      id: newClient.id,
      role: "client",
      message: "Client registered successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Авторизация
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Client.findOne({ where: { email } });
    let role = "client";

    if (!user) {
      user = await Courier.findOne({ where: { email } });
      role = "courier";
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      role,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { loginUser } = require("../models/authorizationModel");

// Маршрут для авторизации
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email и пароль обязательны" });
    }

    // Авторизация пользователя
    const user = await loginUser(email, password);

    // Возвращение роли и идентификатора пользователя
    res.json({
      message: "Успешный вход",
      userId: user.id,
      role: user.role,
    });
  } catch (error) {
    res.status(401).json({ error: "Неверный email или пароль" });
  }
});

module.exports = router;

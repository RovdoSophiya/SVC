const jwt = require("jsonwebtoken");
const Client = require("../models/Client");
const Courier = require("../models/Courier");
const Tokens = require("../models/Tokens");
require("dotenv").config();

const handleError = (res, error) => {
  console.error("Error:", error);
  res.status(500).json({ error: error.message });
};

// Регистрация клиента
const registerClient = async (req, res) => {
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

    // Генерация токенов
    const accessToken = jwt.sign(
      { id: newClient.id, role: "client" },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: newClient.id, role: "client" },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Сохранение токенов в базе данных
    await Tokens.create({
      clientid: newClient.id,
      accesstoken: accessToken,
      refreshtoken: refreshToken,
      expiresat: new Date(Date.now() + 15 * 60 * 1000),
    });

    // Возвращаем токены и информацию о новом клиенте
    res.status(201).json({
      user: newClient,
      // id: newClient.id,
      role: "client",
      accessToken,
      refreshToken,
      message: "Client registered successfully",
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Авторизация
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Поиск пользователя среди клиентов и курьеров
    let user =
      (await Client.findOne({ where: { email } })) ||
      (await Courier.findOne({ where: { email } }));

    // Если пользователь не найден, возвращаем ошибку
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Проверка пароля
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Генерация токенов
    const accessToken = jwt.sign(
      { id: user.id, role: user instanceof Client ? "client" : "courier" },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" } // Срок действия access token
    );

    const refreshToken = jwt.sign(
      { id: user.id, role: user instanceof Client ? "client" : "courier" },
      process.env.REFRESH_TOKEN_SECRET, // Секретный ключ для подписи
      { expiresIn: "7d" } // Срок действия refresh token
    );

    // Сохранение токенов в базе данных
    await Tokens.create({
      clientid: user instanceof Client ? user.id : null,
      courierid: user instanceof Courier ? user.id : null,
      accesstoken: accessToken,
      refreshtoken: refreshToken,
      expiresat: new Date(Date.now() + 15 * 60 * 1000),
    });

    // Возвращаем токены и информацию о пользователе
    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        role: user instanceof Client ? "client" : "courier",
      },
    });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  registerClient,
  loginUser,
};

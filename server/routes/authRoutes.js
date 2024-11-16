const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

// Регистрация клиента
router.post("/register", AuthController.registerClient);

// Авторизация
router.post("/login", AuthController.loginUser);

module.exports = router;

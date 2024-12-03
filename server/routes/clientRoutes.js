const express = require("express");
const router = express.Router();
const ClientController = require("../controllers/clientController");

// Получение информации обо всех клиентах
router.get("/", ClientController.getAllClients);

//Создание клиента
router.post("/", ClientController.createClient);

// Получение информации о клиенте по id
router.get("/:id", ClientController.getClientById);

// Обновление информации о клиенте
router.put("/:id", ClientController.updateClient);

// Удаление клиента по id
router.delete("/:id", ClientController.deleteClient);

//проверка телефона
router.get("/check/check-phone", ClientController.checkPhoneExists);

module.exports = router;

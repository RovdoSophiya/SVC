const express = require("express");
const {
  createClient,
  getClientById,
  updateClient,
  deleteClient,
} = require("../models/clientModel");
const router = express.Router();

//Создание клиента
router.post("/", async (req, res) => {
  try {
    const newClient = await createClient(req.body);
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получение информации о клиенте
router.get("/:id", async (req, res) => {
  try {
    const client = await getClientById(req.params.id);
    if (!client) return res.status(404).json({ error: "Client not found" });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обновление информации о клиенте
router.put("/:id", async (req, res) => {
  try {
    const updatedClient = await updateClient(req.params.id, req.body);
    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удаление клиента по id
router.delete("/:id", async (req, res) => {
  try {
    const deletedClient = await deleteClient(req.params.id);
    res.json({ message: "Client deleted successfully", client: deletedClient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

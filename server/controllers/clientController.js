const Client = require("../models/Client");

class ClientController {
  // Получение информации обо всех клиентах
  async getAllClients(req, res) {
    try {
      const clients = await Client.findAll();
      res.json(clients);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  //Создание клиента
  async createClient(req, res) {
    try {
      if (!req.body.password) {
        return res.status(400).json({ error: "Password is required" });
      }
      const client = await Client.create(req.body);
      res.status(201).json(client);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  // Получение информации о клиенте по id
  async getClientById(req, res) {
    try {
      const client = await Client.findByPk(req.params.id, {
        attributes: { exclude: ["id", "createdAt"] },
      });
      if (!client) return res.status(404).json({ error: "Client not found" });
      res.json(client);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  // Обновление информации о клиенте
  async updateClient(req, res) {
    try {
      const client = await Client.findByPk(req.params.id);
      if (!client) return res.status(404).json({ error: "Client not found" });

      await client.update(req.body, {
        fields: [
          "lastname",
          "name",
          "fathername",
          "phone",
          "address",
          "password",
        ],
      });
      res.json(client);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  // Удаление клиента по id
  async deleteClient(req, res) {
    try {
      const client = await Client.findByPk(req.params.id);
      if (!client) return res.status(404).json({ error: "Client not found" });

      await client.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ClientController();

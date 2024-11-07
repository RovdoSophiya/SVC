const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Добавление мероприятия
router.post("/", async (req, res) => {
  try {
    const { date } = req.body;
    const existingEvent = await Event.findOne({ where: { date } });
    if (existingEvent)
      return res.status(400).json({ message: "Date is already booked" });

    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Редактирование мероприятия
router.put("/:id", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const { date, ...rest } = req.body;

    // Проверка даты мероприятия
    const currentDate = new Date();
    const eventDate = new Date(event.date);
    const daysDifference = (eventDate - currentDate) / (1000 * 60 * 60 * 24);

    if (daysDifference < 5) {
      return res.status(400).json({
        message: "Event cannot be edited within 5 days of its start date",
      });
    }

    // Проверка наличия даты
    if (date && date !== event.date) {
      const existingEvent = await Event.findOne({ where: { date } });
      if (existingEvent)
        return res.status(400).json({ message: "Date is already booked" });
    }

    await event.update({ date, ...rest });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удаление мероприятия
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    await event.destroy();
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();

// Middleware для обработки JSON

app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "static")));

// Разрешаем доступ с порта 3000
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Импорт маршрутов
const authRoutes = require("./routes/authRoutes");
const clientsRouter = require("./routes/clientRoutes");
const couriersRouter = require("./routes/courierRoutes");
const eventsRouter = require("./routes/eventRoutes");
const ordersRouter = require("./routes/orderRoutes");
const orderDishesRouter = require("./routes/orderedDishRoutes");
const deliveriesRouter = require("./routes/deliveryRoutes");
const dishesRouter = require("./routes/dishRoutes");
const cartsRouter = require("./routes/cartRoutes");
const reviewsRouter = require("./routes/reviewRoutes");

// Подключение маршрутов к серверу
app.use("/api/authorization", authRoutes);
app.use("/api/clients", clientsRouter);
app.use("/api/couriers", couriersRouter);
app.use("/api/events", eventsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/orderDishes", orderDishesRouter);
app.use("/api/deliveries", deliveriesRouter);
app.use("/api/dishes", dishesRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/reviews", reviewsRouter);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

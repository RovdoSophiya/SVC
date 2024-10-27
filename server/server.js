const express = require("express");
const cors = require("cors");
// const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
// const courierRoutes = require("./routes/courierRoutes");
// const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Подключение маршрутов
// app.use("/auth", authRoutes);
app.use("/clients", clientRoutes);
// app.use("/couriers", courierRoutes);
// app.use("/orders", orderRoutes);

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

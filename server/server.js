const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./models'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Проверка соединения с базой данных
db.sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Error: ' + err));

// Пример маршрута
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

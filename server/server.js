const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path"); // Необходимо для правильного указания пути
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Настройка статической папки для фронтенда
 app.use(express.static(path.join(__dirname, '../client/public')));

// Получение данных из JSON-файла
const readData = () => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "data.json"), "utf8"));
};

// Запись данных в JSON-файл
const writeData = (data) => {
  fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(data, null, 2));
};

// GET-сервис, который возвращает веб-страницу с фронтенд-кодом
app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "../client/public/index.html"));
 });

// GET-сервис, который возвращает данные в формате JSON
app.get("/api/data", (req, res) => {
  res.json(readData());
});

// POST-сервис, который добавляет данные и возвращает обновлённые данные в формате JSON
app.post("/api/data", (req, res) => {
  const data = readData();
  data.push(req.body); // Добавляем новое блюдо
  writeData(data);
  res.json(data);
});

// DELETE-сервис для удаления данных
app.delete("/api/data/:id", (req, res) => {
  let data = readData();
  data = data.filter((item, index) => index !== parseInt(req.params.id));
  writeData(data);
  res.json(data);
});

// Сервис для получения данных в формате XML/HTML/JSON
app.get("/api/data/formatted", (req, res) => {
  const acceptHeader = req.headers.accept;
  const data = readData();

  if (acceptHeader.includes("application/json")) {
    res.json(data);
  } else if (acceptHeader.includes("text/html")) {
    res.send(
      `<html><body><pre>${JSON.stringify(data, null, 2)}</pre></body></html>`
    );
  } else if (acceptHeader.includes("application/xml")) {
    let xml = "<data>";
    data.forEach((item) => {
      xml += `<item><name>${item.name}</name><description>${item.description}</description></item>`;
    });
    xml += "</data>";
    res.set("Content-Type", "application/xml");
    res.send(xml);
  } else {
    res.status(406).send("Not Acceptable");
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

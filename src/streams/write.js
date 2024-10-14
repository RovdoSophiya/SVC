const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "cars.json");

const writeDataToFile = (newCarData) => {
  // Читаем текущее содержимое файла
  fs.readFile(filePath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.error("Ошибка при чтении файла:", err);
      return;
    }

    let cars = [];

    // Если файл не пустой, парсим его содержимое
    if (data) {
      try {
        cars = JSON.parse(data);
      } catch (parseError) {
        console.error("Ошибка при парсинге JSON:", parseError);
        return;
      }
    }

    // Добавляем новые данные
    cars.push(...newCarData);

    // Записываем обновленный массив обратно в файл
    fs.writeFile(filePath, JSON.stringify(cars, null, 2), (writeError) => {
      if (writeError) {
        console.error("Ошибка при записи файла:", writeError);
      } else {
        console.log("Запись завершена.");
      }
    });
  });
};

const newCars = [
  {
    id: Date.now(),
    make: "Toyota",
    model: "Camry",
    year: 2022,
    vin: "1234567890ABCD",
  },
  {
    id: Date.now() + 1,
    make: "Honda",
    model: "Accord",
    year: 2021,
    vin: "1234567890EFGH",
  },
];

// Вызываем функцию для записи данных
writeDataToFile(newCars);

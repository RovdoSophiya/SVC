const fs = require("fs");
const path = require("path");

const dataFile = "cars.json"; // Имя файла для хранения всех записей
const indexFile = "car_index.json"; // Имя индексного файла

function createRecord(make, model, year, vin) {
  const id = Date.now().toString(); // Уникальный ID на основе времени
  const record = {
    id,
    make,
    model,
    year,
    vin,
  };

  // Проверка существования файла
  if (fs.existsSync(dataFile)) {
    const existingData = JSON.parse(fs.readFileSync(dataFile));

    // Проверка на дубликат по VIN или ID
    const exists = existingData.some((car) => car.vin === vin || car.id === id);
    if (exists) {
      console.error("Ошибка операции FS: Запись с таким VIN уже существует.");
      return;
    }

    // Добавление новой записи
    existingData.push(record);
    fs.writeFileSync(dataFile, JSON.stringify(existingData, null, 2));
  } else {
    // Если файл не существует, создаем новый с первой записью
    fs.writeFileSync(dataFile, JSON.stringify([record], null, 2));
  }

  // Обновление индексного файла
  let index = [];
  if (fs.existsSync(indexFile)) {
    index = JSON.parse(fs.readFileSync(indexFile));
  }
  index.push({
    id,
    make,
    model,
    year,
    vin,
    filename: dataFile, // Ссылка на общий файл
  });
  fs.writeFileSync(indexFile, JSON.stringify(index, null, 2));

  console.log(`Запись успешно добавлена: ${JSON.stringify(record)}`);
}

const args = process.argv.slice(2);
createRecord(args[0], args[1], args[2], args[3]);

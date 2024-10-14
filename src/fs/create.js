const fs = require("fs");
const path = require("path");

const indexFile = "car_index.json";

function createRecord(make, model, year, vin) {
  const id = Date.now().toString();
  const filename = `car_${id}.json`;
  const record = {
    id,
    make,
    model,
    year,
    vin,
    filename,
  };

  // Проверка существования файла
  if (fs.existsSync(filename)) {
    console.error("Ошибка операции FS: Запись уже существует.");
    return;
  }

  // Запись данных о машине в файл
  fs.writeFileSync(filename, JSON.stringify(record, null, 2));

  // Обновление индексного файла
  let index = [];
  if (fs.existsSync(indexFile)) {
    index = JSON.parse(fs.readFileSync(indexFile));
  }
  index.push(record);
  fs.writeFileSync(indexFile, JSON.stringify(index, null, 2));

  console.log(`Запись успешно добавлена: ${filename}`);
}

const args = process.argv.slice(2);
createRecord(args[0], args[1], args[2], args[3]);

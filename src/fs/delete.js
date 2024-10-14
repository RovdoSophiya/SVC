const fs = require("fs");

const dataFile = "cars.json"; // Имя файла для хранения записей
const indexFile = "car_index.json"; // Имя индексного файла

function deleteRecord(id) {
  // Проверка существования файлов
  if (!fs.existsSync(dataFile) || !fs.existsSync(indexFile)) {
    console.error("Один или оба файла не найдены.");
    return;
  }

  // Чтение существующих записей
  const data = JSON.parse(fs.readFileSync(dataFile));
  const indexData = JSON.parse(fs.readFileSync(indexFile));

  // Поиск индекса записи с указанным ID
  const dataIndex = data.findIndex((car) => car.id === id);
  const indexIndex = indexData.findIndex((record) => record.id === id);

  if (dataIndex === -1) {
    console.error("Запись с таким ID не найдена в dataFile.");
    return;
  }

  // Удаление записи из car_data.json
  const deletedRecord = data.splice(dataIndex, 1)[0]; // Удаляем запись и сохраняем её
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

  // Удаление записи из car_index.json, если она существует
  if (indexIndex !== -1) {
    indexData.splice(indexIndex, 1);
    fs.writeFileSync(indexFile, JSON.stringify(indexData, null, 2));
  }

  console.log(`Запись успешно удалена: ${JSON.stringify(deletedRecord)}`);
}

const args = process.argv.slice(2);
deleteRecord(args[0]);

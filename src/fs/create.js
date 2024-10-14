const fs = require("fs");
const path = require("path");

const carDir = path.join(__dirname, "cars");
const indexFile = path.join(carDir, "cars_index.json");

fs.mkdirSync(carDir, { recursive: true });

const createCar = (make, model, year, vin) => {
  const id = Date.now().toString();
  const filename = `car_${id}.json`;
  const carData = { id, make, model, year, vin };

  const carPath = path.join(carDir, filename);

  if (fs.existsSync(carPath)) {
    console.error("Ошибка операции FS: Запись уже существует");
    return;
  }

  fs.writeFileSync(carPath, JSON.stringify(carData, null, 2));

  const index = fs.existsSync(indexFile)
    ? JSON.parse(fs.readFileSync(indexFile))
    : [];
  index.push({ id, make, model, filename });
  fs.writeFileSync(indexFile, JSON.stringify(index, null, 2));

  console.log(`Машина "${make} ${model}" была успешно добавлена.`);
};

// Получаем аргументы командной строки
const [make, model, year, vin] = process.argv.slice(2);

if (make && model && year && vin) {
  createCar(make, model, year, vin);
} else {
  console.log("Использование: node create.js <марка> <модель> <год> <VIN>");
}

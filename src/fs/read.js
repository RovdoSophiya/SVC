const fs = require("fs");
const path = require("path");

const readCar = (id) => {
  const indexPath = path.join(__dirname, "cars", "cars_index.json");
  const index = JSON.parse(fs.readFileSync(indexPath));
  const car = index.find((car) => car.id === id);

  if (!car) {
    console.error("Ошибка: Машина не найдена.");
    return;
  }

  const carPath = path.join(__dirname, "cars", car.filename);
  const carData = fs.readFileSync(carPath);

  console.log("Информация о машине:");
  console.log(carData.toString());
};

const id = process.argv[2];

if (id) {
  readCar(id);
} else {
  console.log("Использование: node read.js <id машины>");
}

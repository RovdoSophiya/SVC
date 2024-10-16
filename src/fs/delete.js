const fs = require("fs");
const path = require("path");

const deleteCar = (id) => {
  const indexPath = path.join(__dirname, "cars", "cars_index.json");
  const index = JSON.parse(fs.readFileSync(indexPath));
  const car = index.find((car) => car.id === id);

  if (!car) {
    console.error("Ошибка: Запись не найдена.");
    return;
  }

  const carPath = path.join(__dirname, "cars", car.filename);

  if (fs.existsSync(carPath)) {
    //удаление файла
    fs.unlinkSync(carPath);
    console.log(`Машина с ID ${id} была удалена.`);

    const updatedIndex = index.filter((car) => car.id !== id);
    fs.writeFileSync(indexPath, JSON.stringify(updatedIndex, null, 2));
  } else {
    console.error("Ошибка: Файл не найден.");
  }
};

const id = process.argv[2];

if (id) {
  deleteCar(id);
} else {
  console.log("Использование: node delete.js <id машины>");
}

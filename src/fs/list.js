const fs = require("fs");
const path = require("path");

const listCars = () => {
  const indexPath = path.join(__dirname, "cars", "cars_index.json");

  if (fs.existsSync(indexPath)) {
    const index = JSON.parse(fs.readFileSync(indexPath));
    console.log("Список всех машин:");
    index.forEach((car) => {
      console.log(`${car.id}: ${car.make} ${car.model} (${car.year})`);
    });
  } else {
    console.log("Записей нет.");
  }
};

listCars();

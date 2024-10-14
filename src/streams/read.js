const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "cars.json");

const readLargeFile = (file) => {
  const readStream = fs.createReadStream(file, { encoding: "utf8" });

  readStream.on("data", (chunk) => {
    console.log("Новый блок данных:", chunk);
  });

  readStream.on("end", () => {
    console.log("Чтение завершено.");
  });

  readStream.on("error", (err) => {
    console.error("Ошибка при чтении файла:", err);
  });
};

if (filePath) {
  readLargeFile(filePath);
} else {
  console.log("Использование: node read.js <путь_к_файлу>");
}

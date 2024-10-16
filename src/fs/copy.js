const fs = require("fs");
const path = require("path");

const copyFile = (src, dest) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(src);
    const writeStream = fs.createWriteStream(dest);

    //on- устаноыка обработки ошибок. вызов метода reject(отклоняет Promise)
    readStream.on("error", reject);
    writeStream.on("error", reject);
    writeStream.on("close", resolve);

    //соединение потока записи и чтения
    readStream.pipe(writeStream);
  });
};

const copyDirectory = async (sourceDir, destDir) => {
  try {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const items = fs.readdirSync(sourceDir);

    for (const item of items) {
      const srcPath = path.join(sourceDir, item);
      const destPath = path.join(destDir, item);

      const stats = fs.statSync(srcPath);

      if (stats.isDirectory()) {
        await copyDirectory(srcPath, destPath);
      } else if (stats.isFile()) {
        await copyFile(srcPath, destPath);
      }
    }

    console.log("Копирование данных о машинах завершено.");
  } catch (err) {
    console.error("Ошибка при копировании данных о машинах:", err);
  }
};

const [source, destination] = process.argv.slice(2);

if (source && destination) {
  copyDirectory(source, destination);
} else {
  console.log(
    "Использование: node copy.js <папка_источник> <папка_назначение>"
  );
}

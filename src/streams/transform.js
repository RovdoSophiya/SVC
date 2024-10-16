const { Transform } = require("stream");
const fs = require("fs");
const path = require("path");

const lowerCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    //chunk-часть потока данных
    const transformedData = chunk.toString().toLowerCase();
    this.push(transformedData);
    //завершение
    callback();
  },
});

const inputFile = path.join(__dirname, "cars.json");
const outputFile = path.join(__dirname, "cars_lowercase.json");

const readStream = fs.createReadStream(inputFile, { encoding: "utf8" });
const writeStream = fs.createWriteStream(outputFile);

readStream.pipe(lowerCaseTransform).pipe(writeStream);

writeStream.on("finish", () => {
  console.log("Трансформация завершена.");
});

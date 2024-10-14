const { Transform } = require("stream");
const fs = require("fs");
const path = require("path");

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const transformedData = chunk.toString().toUpperCase();
    this.push(transformedData);
    callback();
  },
});

const inputFile = path.join(__dirname, "cars.json");
const outputFile = path.join(__dirname, "cars_uppercase.json");

const readStream = fs.createReadStream(inputFile, { encoding: "utf8" });
const writeStream = fs.createWriteStream(outputFile);

readStream.pipe(upperCaseTransform).pipe(writeStream);

writeStream.on("finish", () => {
  console.log("Трансформация завершена.");
});

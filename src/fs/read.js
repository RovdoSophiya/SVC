const fs = require("fs");

function readRecord(filename) {
  fs.readFile(filename, "utf8", (err, data) => {
    if (err) return console.error(err);
    console.log("Данные записи:", JSON.parse(data));
  });
}

const args = process.argv.slice(2);
readRecord(args[0]);

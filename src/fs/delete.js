const fs = require("fs");

function deleteRecord(filename) {
    fs.unlink(filename, (err) => {
        if (err) return console.error(err);
        console.log("Запись удалена.");
    });
}

const args = process.argv.slice(2);
deleteRecord(args[0]);
const fs = require("fs");

function renameFile(oldName, newName) {
    fs.rename(oldName, newName, (err) => {
        if (err) return console.error(err);
        console.log(`Файл переименован: ${newName}`);
    });
}

const args = process.argv.slice(2);
renameFile(args[0], args[1]);
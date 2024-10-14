const fs = require("fs-extra");

function copyDirectory(src, dest) {
    fs.copy(src, dest)
        .then(() => console.log('Копирование завершено!'))
        .catch(err => console.error(err));
}

const args = process.argv.slice(2);
copyDirectory(args[0], args[1]);
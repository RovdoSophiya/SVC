const fs = require("fs");

function readLargeFile(file) {
    const stream = fs.createReadStream(file, { encoding: 'utf8' });
    stream.on('data', (chunk) => {
        console.log(chunk);
    });
    stream.on('end', () => {
        console.log('Чтение завершено.');
    });
}

const args = process.argv.slice(2);
readLargeFile(args[0]);
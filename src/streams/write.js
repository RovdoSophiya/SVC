const fs = require("fs");

function writeData(file, data) {
    const stream = fs.createWriteStream(file, { flags: 'a' });
    stream.write(data + '\n', () => {
        console.log('Данные записаны.');
        stream.end();
    });
}

const args = process.argv.slice(2);
writeData(args[0], args[1]);
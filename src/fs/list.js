const fs = require("fs");

function listRecords() {
    const indexFile = 'car_index.json';
    if (!fs.existsSync(indexFile)) {
        console.log("Индексный файл не найден.");
        return;
    }

    const index = JSON.parse(fs.readFileSync(indexFile));
    console.log("Список записей:");
    index.forEach(record => {
        console.log(`ID: ${record.id}, Make: ${record.make}, Model: ${record.model}, Year: ${record.year}`);
    });
}

listRecords();
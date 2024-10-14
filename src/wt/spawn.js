const { spawn } = require('child_process');

function searchInCars(keyword) {
    const child = spawn('node', ['search.js', keyword]);

    child.stdout.on('data', (data) => {
        console.log(`Результаты поиска: ${data}`);
    });

    child.stderr.on('data', (data) => {
        console.error(`Ошибка: ${data}`);
    });
}

const args = process.argv.slice(2);
searchInCars(args[0]);
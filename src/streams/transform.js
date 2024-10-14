const { Transform } = require('stream');

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        const transformed = chunk.toString().toUpperCase(); // Пример преобразования
        callback(null, transformed);
    }
});

process.stdin.pipe(transformStream).pipe(process.stdout);
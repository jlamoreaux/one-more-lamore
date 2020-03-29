const http = require('http');
const express = require('express');

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.get('/', (req, res) => {
    res.send('One More Lamore!!!');
});

const server = app.listen(3000, () => console.log(`Server ready, running at http://${hostname}:${port}/`));

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated')
    })
})

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });
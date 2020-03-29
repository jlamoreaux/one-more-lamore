// const http = require('http');
const express = require('express');
const routes = require('./routes/index');
const app = express();

app.use('/', routes);

module.exports = app;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });
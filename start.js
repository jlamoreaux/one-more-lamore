const app = require('./app');

const hostname = '127.0.0.1';
const port = 3000;

const server = app.listen(3000, () => {
    console.log(`Express is running on port ${server.address().port}`);
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated')
    })
})

process.env.NODE_ENV // "development"
const mongoose = require('mongoose');

require('dotenv').config({ path: 'config.env' });

// Connect to database
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
    console.error(`DATABASE CONNECTION ERROR!!! >>> ${err.message}`);
});

// Import Models

require('./models/Gallery');
require('./models/Blog');



const app = require('./app.js');

app.set('port', process.env.PORT || 3000);

// const hostname = '127.0.0.1';
// const port = 3000;

const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

// process.env.NODE_ENV // "development"
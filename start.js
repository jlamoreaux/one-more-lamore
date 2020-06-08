const mongoose = require('mongoose');

// import environmental variables
require('dotenv').config({ path: 'config.env' });

// Connect to database
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }); // useNewUrlParser because of deprecation warning
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
	console.error(`DATABASE CONNECTION ERROR!!! >>> ${err.message}`);
});

// Import Models

require('./models/Gallery');
require('./models/Blog');
require('./models/User');


// Start the app!
const app = require('./app.js');

app.set('port', process.env.PORT);
const server = app.listen(app.get('port'), () => {
	console.log(`Express running → PORT ${server.address().port}`);
});
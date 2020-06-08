const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const flash = require('connect-flash');
const promisify = require('es6-promisify');
const helpers = require('./helpers');
const routes = require('./routes');
const errorHandlers = require('./handlers/errorHandlers');
require('./handlers/passport');

/* 
    Express
*/

const app = express();

// View Engine - Pug 
app.set('views', path.join('./views'));
app.set('view engine', 'pug');

// Static Directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse raw requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// For validating registration
app.use(expressValidator());

// Pass along cookies
app.use(cookieParser());

// Keep users logged in
app.use(session({
	secret: process.env.SECRET,
	key: process.env.KEY,
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Passport JS to handle logins
app.use(passport.initialize());
app.use(passport.session());

// So we can flash messages
app.use(flash());

app.use((req, res, next) => {
	res.locals.h = helpers;
	res.locals.flashes = req.flash();
	res.locals.user = req.user || null;
	res.locals.currentPath = req.path;
	next();
});

app.use((req, res, next) => {
    req.login = promisify(req.login, req);
    next();
});


/*
    Routing
*/
app.use('/', routes);
// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

if (app.get('env') === 'development') {
	/* Development Error Handler - Prints stack trace */
	app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

// Exports
module.exports = app;
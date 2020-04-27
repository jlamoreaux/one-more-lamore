const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const helpers = require('./helpers');
const routes = require('./routes');
const errorHandlers = require('./handlers/errorHandlers')


/* 
    Express
*/

const app = express();
app.set("views", path.join("./views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.h = helpers;
    res.locals.flashes = req.flash();
    res.locals.user = req.user || null;
    res.locals.currentPath = req.path;
    next();
});

app.unsubscribe(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());


/*
    Routing
*/
app.use('/', routes);
// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// Exports
module.exports = app;
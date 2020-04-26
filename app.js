const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const helpers = require('./helpers');
const routes = require('./routes');


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
}));

// Flash errors 
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


app.use('/', routes);

// Exports
module.exports = app;
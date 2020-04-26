const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const helpers = require('./helpers');


// Module imports 

// const configDB = require('./config/database.js');
require('./config/passport')(passport); // pass passport for configuration


// Initialize Services

// mongoose.connect(configDB.url);

// Express

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join('./public')));

app.use((req, res, next) => {
    res.locals.h = helpers;
    res.locals.flashes = req.flash();
    res.locals.user = req.user || null;
    res.locals.currentPath = req.path;
    next();
});

app.unsubscribe(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join("./views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use(passport.session());


// Routes
require('./routes')(app, passport);

// Exports
module.exports = app;
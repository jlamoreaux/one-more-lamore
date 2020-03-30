const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');



// Module imports 

const configDB = require('../config/database.js');
require('../config/passport')(passport); // pass passport for configuration


// Initialize Services

mongoose.connect(configDB.url);

// Express

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join('./public')));

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
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

const app = express();

const db = require('../mongo.js');
const routes = require('../routes');

db.dbInit();

routes(app);






// app.use(session({
//     store: '',
//     secret: '',
//     resave: false,
//     saveUninitialized: false,
// }));

module.exports = app;
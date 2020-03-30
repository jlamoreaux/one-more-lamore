const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const LocalStrategy = require('passport-local').Strategy;



// Module imports 
// const db = require('../mongo.js');
// const routes = require('../routes');
// const auth = require(__dirname + '/auth');

// Initialize Services

// db.dbInit();
// routes(app);
// auth(app)


// Express

const app = express();

const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Database
mongoose.connect('mongodb://localhost:27017/MyDatabase')

const Schema = mongoose.Schema;
const UserDetail = new Schema({
    username: String,
    password: String
});
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');



// Authentication

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("Welcome " + req.query.username + "!!"));
app.get('/error', (req, res) => {
    res.send("error logging in")
});

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    User.findById(id, function (err, user) {
        cb(err, user);
    });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        UserDetails.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                console.log(err);
                return done(err);
            }

            if (!user) {
                console.log('user does not exist')    
                return done(null, false);
            }

            if (user.password != password) {
                console.log('wrong password');
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

app.post('/authenticate',
    passport.authenticate('local', { failureRedirect: '/error'}),
    function (req, res) {
        res.redirect('/success?username=' + req.user.username);
    }
);



// Routing

app.unsubscribe(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join("./views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.get("/login", (req, res) => {
    // res.sendFile('auth.html', { root: './views' })
    res.render("login", { title: "Login" });
});


// Exports
module.exports = app;
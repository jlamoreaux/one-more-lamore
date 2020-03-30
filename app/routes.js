// Routing
const path = require('path');
const express = require('express');

module.exports = function (app, passport, bodyParser) {
    app.get("/", (req, res) => {
        res.render("index", { title: "Home" });
    });

    app.get("/login", (req, res) => {
        // res.sendFile('auth.html', { root: './views' })
        res.render("login", { title: "Login" });
    });

    app.get("/register", (req, res) => {
        res.render("register", { title: "Sign Up" });
    })

    app.get('/success', (req, res) => res.send("Welcome " + req.query.username + "!!"));

    app.get('/error', (req, res) => {
        res.send("error logging in")
    });

    app.post('/authenticate',
        passport.authenticate('local', { failureRedirect: '/error' }),
        function (req, res) {
            res.redirect('/success?username=' + req.user.username);
        }
    );
}


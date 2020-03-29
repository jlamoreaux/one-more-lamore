const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

function init(app) {
    app.unsubscribe(bodyParser.urlencoded({ extended: true }));

    app.set("views", path.join("./views"));
    app.set("view engine", "pug");
    app.use(express.static(path.join(__dirname, "public")));

    app.get("/", (req, res) => {
        res.render("index", { title: "Home" });
    });

    app.get("/login", (req, res) => {
        res.render("login", { title: "Login" });
    });
}

module.exports = init;
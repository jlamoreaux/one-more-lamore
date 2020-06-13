const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Login Failed',
    successRedirect: '/updates',
    successFlash: 'Welcome!',
});

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Log out successful');
    res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next(); // user is logged in, keep going
        return;
    }
    req.flash('error', 'Sorry, you need to be logged in to do that!');
    res.redirect('/login');
};

exports.isAdmin = (req, res, next) => {
    const backURL = req.header('Referer');
    if (req.isAuthenticated()) {
        if (req.user.isAdmin) {
            next();
            return;
        }
    }
    req.flash('error', 'Sorry, you don\'t have permission to do that');
    res.redirect(backURL);
};

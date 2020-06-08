const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Login Failed',
    successRedirect: '/',
    successFlash: 'Welcome!',
});

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Log out successful');
    res.redirect('/');
};

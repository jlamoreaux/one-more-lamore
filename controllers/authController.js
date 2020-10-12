const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Login Failed',
    successRedirect: '/home',
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

exports.isActive = (req, res, next) => {
    const backURL = req.header('Referer');
    if (req.isAuthenticated()) {
        if (req.user.isActive) {
            next();
            return;
        }
    }
    req.flash('error', 'Sorry, you don\'t have permission to do that');
    res.redirect('/home');
};

exports.confirmedPasswords = (req, res, next) => {
  if (req.body.password === req.body['pwconfirm']) {
    next();
    return;
  }
  req.flash('error', 'Passwords do not match!');
  res.redirect('back');
};

exports.forgotForm = (req, res) => {
  res.render('forgotPassword', { title: 'Reset Password' });
};

exports.passwordForm = (req, res) => {
  res.render('updatePassword', { title: 'Update Password' });
};

exports.resetPassword = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }, // Looking for a expiration that is greater ($gt) than now.
  });
  if (!user) {
    req.flash('error', 'No user found or link has expired');
    return res.redirect('/login');
  }
  res.render('reset', { title: 'Reset Password' });
};

exports.sendResetLink = async (req, res, next) => {
  req.checkBody('email', 'That email is not valid!').isEmail();
  const errors = req.validationErrors();
  if (errors) {
    req.flash(
      'error',
      errors.map((err) => err.msg)
    );
    res.redirect('/forgotpassword');
  } else {
    const user = await User.findByUsername(req.body.email);
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 900000; // 15 min from now
    await user.save();
    if (user) {
      console.log(user.firstName);
      const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
      await mail.send({
        recipient: req.body.email,
        subject: 'Password Reset Link',
        user,
        resetURL,
        filename: 'password-reset',
      });
    }
    req.flash('info', 'If account exists, a password reset link has been sent');
    res.redirect('/login');
  }
};

exports.checkToken = async (req, res, next) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }, // Looking for a expiration that is greater ($gt) than now.
  });
  if (!user) {
    req.flash("error", "No user found or link has expired");
    return res.redirect("/login");
  }
  req.user = user;
  next();
};


exports.update = async (req, res) => {
    // const user = await User.findOne({
    //     resetPasswordToken: req.params.token,
    //     resetPasswordExpires: { $gt: Date.now() }, // Looking for a expiration that is greater ($gt) than now.
    // });
    // if (!user) {
    //     req.flash('error', 'No user found or link has expired');
    //     return res.redirect('/login');
    // }
  const user = req.user;
  const setPassword = promisify(req.user.setPassword, req.user);
  await setPassword(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  const updatedUser = await user.save();
  await req.login(updatedUser);
  req.flash('success', 'Your password has been reset');
  res.redirect('/home');
};

exports.isAdmin = (req, res, next) => {
    // const backURL = req.header('Referer');
    if (req.isAuthenticated()) {
        if (req.user.isAdmin) {
            next();
            return;
        }
    }
    req.flash('error', 'Sorry, you don\'t have permission to do that');
    res.redirect('/home');
};

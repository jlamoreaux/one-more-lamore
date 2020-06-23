const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

exports.loginForm = (req, res) => {
	res.render('login', { title: 'Login' });
};

exports.registrationFrom = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/account');
        return;
    }
    res.render('register', { title: 'Register' });
};

exports.validateRegistration = (req, res, next) => {
    req.sanitizeBody('firstname');
    req.sanitizeBody('lastname');
    req.checkBody('firstname', 'You must supply a first name!').notEmpty();
    req.checkBody('firstname', 'You must supply a last name!').notEmpty();
    req.checkBody('email', 'That Email is not Valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false,
    });
    req.checkBody('password', 'Password Cannot Be Blank!').notEmpty();
    req
        .checkBody('pwconfirm', 'Please confirm your password')
        .notEmpty();
    req
        .checkBody('pwconfirm', 'Oops, your passwords do not match!')
        .equals(req.body.password);

    const errors = req.validationErrors();

    if (errors) {
        req.flash(
            'error',
            errors.map((err) => err.msg)
        );
        res.render('register', {
            title: 'Register',
            body: req.body,
            flashes: req.flash(),
        });
        return;
    }
    next();
};

exports.register = async (req, res, next) => {
    const user = new User({ email: req.body.email, firstName: req.body.firstname, lastName: req.body.lastname });
    const register = promisify(User.register, User);
    try {
        await register(user, req.body.password);
        next();
    } catch (e) {
        const backURL = req.header('Referer');
        console.log(e);
        req.flash('error', e.message);
        res.redirect(backURL);
    }
    const activateURL = `http://${req.headers.host}/account/activate/${user._id}`;
    await mail.send({
        recipient: process.env.WEBMASTER,
        subject: 'New User Registration',
        user,
        activateURL,
        filename: 'user-activation',
    });
};

exports.account = (req, res) => {
    res.render('account', { title: 'Edit your account' });
}

exports.updateAccount = async (req, res) => {
    const updates = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
    };

    const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: updates },
        { new: true, runValidators: true, context: 'query' }
    );
    req.flash('success', 'Updated the profile!');
    res.redirect('back');
}

exports.activateAccount = async (req, res) => {
    const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                isActive: true
            }
        },
        { new: true, runValidators: true, context: 'query' }
    );
    req.flash('success', `${user.firstName} is now an active user!`);
    res.redirect('/updates');
}

exports.clearAlerts = async (req, res) => {
    const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        {
            $set: {
                alerts: []
            }
        },
    );
    res.json(user);
}
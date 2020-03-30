const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user');

// Authentication

module.exports = function (passport) {

    // const Schema = mongoose.Schema;
    // const UserDetail = new Schema({
    //     username: String,
    //     password: String
    // });
    // const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');


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
            User.findOne({
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

    // passport.use('local-signup', new LocalStrategy({ passReqToCallback: true },
    //     function (user) {
    //         User.findOne({
    //             username: user.username
    //         }, function (err, user) {
    //             if (err) {
    //                 console.log(err);
    //                 return done(err);
    //             }

    //             if (user) {
    //                 return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
    //             } else {
    //             }
    //         })
    //     })
    // )   
}
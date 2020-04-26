const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Authentication

module.exports = function (passport) {

    // INITIALIZE SESSION

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    
    // LOCAL LOGIN

    passport.use(new LocalStrategy(
        function (email, password, done) {
            User.findOne({
                username : email
            }, function (err, user) {
                if (err) {
                    console.log(err);
                    return done(err);
                }

                if (!user) {
                    console.log(`user "${email}" does not exist`)
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

   
    // LOCAL SIGN UP

    passport.use('local-signup', new LocalStrategy({
    },
        function (user, done) {
            User.findOne({
                'local.email': user.email
            }, function (err, user) {
                if (err) {
                    console.log(err);
                    return done(err);
                }

                if (user) {
                    return done(null, false, console.log('signupMessage', 'That email is already taken.'));
                } else {
                    // if there is no user with that email
                    // create the user
                    let newUser = new User();

                    // set the user's local credentials
                    newUser.email = email;
                    newUser.password = newUser.generateHash(password); // use the generateHash function in our user model

                    // save the user
                    newUser.save(function (err) {
                        console.log('saving user');
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            })
        })
    )   
}
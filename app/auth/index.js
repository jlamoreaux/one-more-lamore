const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

function auth(app) {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            app.UserDetails.findOne({
                username: username
            }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false);
                }

                if (user.password != password) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    ));

    app.post('/authenticate',
        passport.authenticate('local', { failureRedirect: '/error' }),
        function (req, res) {
            res.redirect('/success?username=' + req.user.username);
        }
    );

    // Passport
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/success', (req, res) => res.send("Welcome " + req.query.username + "!!"));
    app.get('/error', (req, res) => res.send("error logging in"));

    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function (id, cb) {
        User.findById(id, function (err, user) {
            cb(err, user);
        });
    });
}



module.exports = auth;
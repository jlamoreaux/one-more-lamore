const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');


router.get("/", mainController.homepage);

//     app.get("/login", (req, res) => {
//         // res.sendFile('auth.html', { root: './views' })
//         res.render("login", { title: "Login" });
//     });

//     app.get("/register", (req, res) => {
//         res.render("register", { title: "Sign Up" });
//     })

//     app.get('/success', (req, res) => res.send("Welcome " + req.query.name + "!!"));

//     app.get('/error', (req, res) => {
//         res.send("error logging in")
//     });

    // app.post('/authenticate',
    //     passport.authenticate('local', { failureRedirect: '/error' }),
    //     function (req, res) {
    //         res.redirect('/success?name=' + req.user.firstname);
    //     }
    // );

    // app.post('/registration',
    //     passport.authenticate('local-signup',
    //         {
    //             failureRedirect: '/register',
    //             successRedirect: '/'
    //         }
    //     )
    // );

    // app.get('/albums', (req, res) => {
    //     api_helper()
    //         .then(response => {
    //             res.json(response)
    //             console.log(response)
    //         })
    //         .catch(error => {
    //             res.send(error)
    //         })
    // })


module.exports = router;
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get("/", catchErrors(mainController.homepage));

router.get("/gallery", catchErrors(mainController.getGalleries));
router.get("/gallery/create", mainController.addGallery);

router.get("/gallery/:slug", catchErrors(mainController.getGallery));

router.post('/gallery/add',
    mainController.upload,
    catchErrors(mainController.resize),
    catchErrors(mainController.createGallery)
);
router.post('/gallery/update/:slug',
    mainController.upload,
    catchErrors(mainController.resize),
    catchErrors(mainController.updateGallery)
);


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
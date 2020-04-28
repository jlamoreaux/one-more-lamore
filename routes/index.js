const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get("/", galleryController.homepage);

router.get("/gallery", catchErrors(galleryController.getGalleries));
router.get("/gallery/create", galleryController.addGallery);

router.get("/gallery/:slug", catchErrors(galleryController.getGallery));

router.post('/gallery/add',
    galleryController.upload,
    catchErrors(galleryController.resize),
    catchErrors(galleryController.createGallery)
);
router.post('/gallery/update/:slug',
    galleryController.upload,
    catchErrors(galleryController.resize),
    catchErrors(galleryController.updateGallery)
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
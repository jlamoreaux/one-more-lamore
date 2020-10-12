const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const blogController = require('../controllers/blogController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const additionalController = require('../controllers/additionalControllers');
const { catchErrors } = require('../handlers/errorHandlers');


/*
    Gallery Routes
*/

router.get('/', galleryController.splashpage);

router.get('/home', authController.isLoggedIn, galleryController.homepage);

router.get('/gallery', authController.isActive, catchErrors(galleryController.getGalleries));
router.get('/gallery/create', authController.isAdmin, galleryController.addGallery);

router.get('/gallery/:slug', authController.isActive, catchErrors(galleryController.getGallery));

router.post('/gallery/add',
	authController.isAdmin,
	galleryController.upload,
    catchErrors(galleryController.resize),
    catchErrors(galleryController.createGallery)
);
router.post('/gallery/update/:slug',
	authController.isAdmin,
	galleryController.upload,
	// catchErrors(galleryController.resize),
	catchErrors(galleryController.updateGallery)
);

/*
    Blog Routes
*/

router.get('/updates', authController.isActive, catchErrors(blogController.getBlogs));
router.get('/updates/create', authController.isAdmin, blogController.addBlog);

router.get('/updates/:slug', authController.isActive, catchErrors(blogController.getBlog));

router.post('/updates/add',
	authController.isAdmin,
	blogController.upload,
	catchErrors(blogController.resize),
	catchErrors(blogController.createBlog)
);

router.get('/updates/:id/edit', authController.isAdmin, catchErrors(blogController.editBlog));
router.post(
  '/updates/add/:id',
  authController.isAdmin,
  blogController.upload,
  catchErrors(blogController.resize),
  catchErrors(blogController.updateBlog)
);

/*
	User Routes
*/
router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));
router.get('/account/activate/:id', authController.isAdmin, catchErrors(userController.activateAccount));
router.get('/account/clear-alerts', authController.isLoggedIn, catchErrors(userController.clearAlerts));


/*
    Auth Routes
*/

router.get('/login', userController.loginForm);
router.get('/register', userController.registrationFrom);
router.get('/logout', authController.logout);

router.post('/login', authController.login);

router.post('/register',
    userController.validateRegistration,
    userController.register,
    // TODO: Login
    authController.login
);

router.get('/forgotpassword', authController.forgotForm);
router.post('/pwreset', authController.sendResetLink);

router.get('/account/password', authController.passwordForm);
router.post('/account/password', authController.confirmedPasswords, catchErrors(authController.update));

router.get('/account/reset/:token', catchErrors(authController.resetPassword));
router.post('/account/reset/:token',
    authController.confirmedPasswords,
    catchErrors(authController.checkToken),
    catchErrors(authController.update));


/*
    Other Routes
*/

router.post('/comment/blog/:id', catchErrors(additionalController.addBlogComment));
router.post('/comment/gallery/:id', catchErrors(additionalController.addGalleryComment));

router.get('/registry', additionalController.getRegistry);


module.exports = router;
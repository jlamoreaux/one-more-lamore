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

router.get('/', galleryController.homepage);

router.get('/gallery', authController.isLoggedIn, catchErrors(galleryController.getGalleries));
router.get('/gallery/create', authController.isAdmin, galleryController.addGallery);

router.get('/gallery/:slug', authController.isLoggedIn, catchErrors(galleryController.getGallery));

router.post('/gallery/add',
	authController.isAdmin,
	galleryController.upload,
	catchErrors(galleryController.resize),
	catchErrors(galleryController.createGallery)
);
router.post('/gallery/update/:slug',
	authController.isAdmin,
	galleryController.upload,
	catchErrors(galleryController.resize),
	catchErrors(galleryController.updateGallery)
);

/*
    Blog Routes
*/

router.get('/updates', authController.isLoggedIn, catchErrors(blogController.getBlogs));
router.get('/updates/create', authController.isAdmin, blogController.addBlog);

router.get('/updates/:slug', authController.isLoggedIn, catchErrors(blogController.getBlog));

router.post('/updates/add',
	authController.isAdmin,
	blogController.upload,
	catchErrors(blogController.resize),
	catchErrors(blogController.createBlog)
);

/*
	User Routes
*/
router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));


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


/*
    Other Routes
*/

router.post('/comment/blog/:id', catchErrors(additionalController.addBlogComment));
router.post('/comment/gallery/:id', catchErrors(additionalController.addGalleryComment));

router.get('/registry', additionalController.getRegistry);


module.exports = router;
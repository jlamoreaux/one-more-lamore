const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const blogController = require('../controllers/blogController');
const additionalController = require('../controllers/additionalControllers');
const { catchErrors } = require('../handlers/errorHandlers');


/*
    Gallery Routes
*/

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

/*
    Blog Routes
*/

router.get("/updates", catchErrors(blogController.getBlogs));
router.get("/updates/create", blogController.addBlog);

router.get("/updates/:slug", catchErrors(blogController.getBlog));

router.post("/updates/add",
    blogController.upload,
    catchErrors(blogController.resize),
    catchErrors(blogController.createBlog)
);


/*
    Other Routes
*/

router.get("/registry", additionalController.getRegistry);


module.exports = router;
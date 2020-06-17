const multer = require('multer');
const mongoose = require('mongoose');
const Gallery = mongoose.model('Gallery');
const jimp = require('jimp');
const uuid = require('uuid');
const slug = require('slugs');

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            next(null, true);
        } else {
            next({ message: `That file type isn't allowed!` }, false);
        }
    }
};

exports.splashpage = (req, res) => {
    res.render('index');
}

exports.homepage = (req, res) => {
    res.render('index2', { title: 'Home' });
}

exports.getGalleries = async (req, res) => {
    const galleries = await Gallery.find();
    res.render('galleries', { title: 'Galleries', galleries });
}

exports.addGallery = (req, res) => {
    res.render('addGallery', { title: 'Add Gallery' });
}

exports.getGallery = async (req, res) => {
    const gallery = await Gallery.findOne({ slug: req.params.slug });
    res.render('gallery', { title: gallery.name, gallery });
}

exports.upload = multer({ multerOptions }).array('photos', 40);

exports.resize = async (req, res, next) => {
    // Check if there is no new file to resize
    if (!req.files) {
        console.log("No new file");
        next();
        return;
    }

    // Get File Type & Rename
    let i = 0;

    req.body.photos = [];
    req.files.forEach(async function (file) {

        let extension = file.mimetype.split('/')[1];
        req.body.photos.push(`${uuid.v4()}.${extension}`);
        // Resize the image
        let photos = await jimp.read(file.buffer);

        await photos.resize(800, jimp.AUTO);

        await photos.write(`./public/gallery-images/${slug(req.body.name)}/${req.body.photos[i]}`);
        i++
    });

    next();
}

exports.createGallery = async (req, res) => {
    // TODO: Upload photos and create gallery
    const gallery = await(new Gallery(req.body)).save();
    await gallery.save();
    req.flash('success', `Successfully Created Gallery "${gallery.name}".`)
    res.redirect(`/gallery/${gallery.slug}`);
}

exports.updateGallery = (req, res) => {
    // TODO: Update gallery
}

// const photoResize = async (file, req) => {
//     let photo = await jimp.read(file.buffer);
//     await photo.resize(800, jimp.AUTO);
//     await photo.write(`./public/gallery/${req.body.name}/${photo}`);
// }
const multer = require('multer');
const mongoose = require('mongoose');
const Gallery = mongoose.model('Gallery');
const User = mongoose.model('User');
const uuid = require('uuid');
const slug = require('slugs');
const sharp = require('sharp');
const fs = require('fs');

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            next(null, true);
        } else {
            next({ message: 'That file type isn\'t allowed!' }, false);
        }
    }
};

const pushAlert = async (gallery) => {
  const users = await User.find();
  users.forEach((user) => {
    user.alerts.push({ type: 'gallery', slug: gallery.slug });
    user.save();
  });
};

exports.splashpage = (req, res) => {
    res.render('index', { title: 'OneMoreLamore' });
};

exports.homepage = (req, res) => {
    res.render('index2', { title: 'Home' });
};

exports.getGalleries = async (req, res) => {
    const galleries = await Gallery.find().sort([['created', -1]]);
    res.render('galleries', { title: 'Galleries', galleries });
};

exports.addGallery = (req, res) => {
    res.render('addGallery', { title: 'Add Gallery' });
};

exports.getGallery = async (req, res) => {
    const gallery = await Gallery.findOne({ slug: req.params.slug });
    res.render('gallery', { title: gallery.name, gallery });
};

exports.upload = multer({ multerOptions }).array('photos', 200);

exports.resize = async (req, res, next) => {
    console.log('begining to resize images');
    // Check if there is no new file to resize
    if (!req.files) {
        console.log('No new file');
        // next();
        return;
    }

    req.body.photos = [];
    if (fs.existsSync(`./public/gallery-images/${slug(req.body.name)}`)) {
      console.log('Folder Exists');
    } else {
      fs.mkdirSync(`./public/gallery-images/${slug(req.body.name)}`);
    }

    await Promise.all(
        req.files.map(async file => {
            let extension = file.mimetype.split('/')[1];
            let fileName = `${uuid.v4()}.${extension}`;
            req.body.photos.push(fileName);
            await sharp(file.buffer)
                .resize(800)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`./public/gallery-images/${slug(req.body.name)}/${fileName}`);
        })
    );

    next();
};

exports.createGallery = async (req, res) => {
    const gallery = await(new Gallery(req.body)).save();
    await gallery.save();
    req.flash('success', `Successfully Created Gallery "${gallery.name}". Please check back in a few moments to view photos.`);
    res.redirect(`/gallery/${gallery.slug}`);
    pushAlert(gallery);
};

exports.updateGallery = (req, res) => {
    // TODO: Update gallery
};
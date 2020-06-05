const multer = require('multer');
const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');
const jimp = require('jimp');
const uuid = require('uuid');
// const slug = require('slugs');

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

exports.getBlogs = async (req, res) => {
	const blogs = await Blog.find();
	res.render('blogs', { title: 'Updates', blogs });
};

exports.addBlog = (req, res) => {
	res.render('addBlog', { title: 'Add Update' });
};

exports.getBlog = async (req, res) => {
	const blog = await Blog.findOne({ slug: req.params.slug });
	res.render('blog', { title: blog.title, blog });
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
	console.log('checking for images...');
	// Check if there is no new file to resize
	if (!req.file) {
		console.log('no photos');
		next();
		return;
	}

	console.log('we got photos');
	// Get File Type & Rename
	const extension = req.file.mimetype.split('/')[1];
	req.body.photo = `${uuid.v4()}.${extension}`;

	// Resize the image
	const photo = await jimp.read(req.file.buffer);
	await photo.resize(800, jimp.AUTO);
	await photo.write(`./public/blog-images/${req.body.photo}`);

	next();
};

exports.createBlog = async (req, res) => {
	// TODO: Upload photos and create gallery
	const blog = await (new Blog(req.body)).save();
	await blog.save();
	req.flash('success', `Successfully Posted Update "${blog.title}".`);
	res.redirect(`/updates/${blog.slug}`);
};
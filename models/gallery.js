const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const gallerySchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'Please enter a gallery name!'
	},
	slug: String,
	description: {
		type: String,
		trim: true
	},
	tags: [String],
	created: {
		type: Date,
		default: Date.now,
	},
	photos: [String]
});

gallerySchema.pre('save', function (next) {
	if (!this.isModified) {
		next();
		return;
	}
	this.slug = slug(this.name);
	next();

	// TODO make more resiliant so slugs are unique
});

module.exports = mongoose.model('Gallery', gallerySchema);
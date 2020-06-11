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

gallerySchema.virtual('comments', {
	ref: 'GalleryComment', // which model to link?
	localField: '_id', // which field on the gallery?
	foreignField: 'gallery', // which field on the comment?
});

function autopopulate(next) {
	this.populate('comments');
	next();
}

gallerySchema.pre('find', autopopulate);
gallerySchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Gallery', gallerySchema);
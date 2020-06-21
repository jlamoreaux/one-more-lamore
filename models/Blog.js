const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: 'Please enter a blog title!'
	},
	slug: String,
	headline: {
		type: String,
		trim: true
	},
	body: {
		type: String,
		trim: false
	},
	tags: [String],
	created: {
		type: Date,
		default: Date.now,
	},
	owner: {
		type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'An owner must be supplied'
	},
	photo: String
});

blogSchema.pre('save', function (next) {
	if (!this.isModified) {
		next();
		return;
	}
	this.slug = slug(this.title);
	next();

	// TODO make more resiliant so slugs are unique
	
});

blogSchema.virtual('comments', {
	ref: 'BlogComment', // which model to link?
	localField: '_id', // which field on the blog?
	foreignField: 'blog', // which field on the comment?
});

function autopopulate(next) {
	this.populate('owner');
	this.populate('comments');
	next();
}

blogSchema.pre('find', autopopulate);
blogSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Blog', blogSchema);
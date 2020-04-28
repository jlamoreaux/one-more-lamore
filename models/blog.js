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

module.exports = mongoose.model('Blog', blogSchema);
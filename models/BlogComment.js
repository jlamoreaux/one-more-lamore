const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const blogCommentSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'An author must be supplied'
    },
    blog: {
        type: mongoose.Schema.ObjectId,
        ref: 'Blog',
        required: 'A post must be supplied'
    },
    text: {
        type: String,
        required: 'Comment has no content'
    }
});

function autopopulate(next) {
  this.populate('author');
  next();
}

blogCommentSchema.pre('find', autopopulate);
blogCommentSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('BlogComment', blogCommentSchema);
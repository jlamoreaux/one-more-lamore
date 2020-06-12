const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const galleryCommentSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'An author must be supplied',
  },
  gallery: {
    type: mongoose.Schema.ObjectId,
    ref: 'Gallery',
    required: 'A gallery must be supplied',
  },
  text: {
    type: String,
    required: 'Comment has no content',
  },
});

function autopopulate(next) {
    this.populate('author');
    next();
}

galleryCommentSchema.pre('find', autopopulate);
galleryCommentSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('GalleryComment', galleryCommentSchema);

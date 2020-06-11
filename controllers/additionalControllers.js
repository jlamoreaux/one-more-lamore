const mongoose = require('mongoose');
const GalleryComment = mongoose.model('GalleryComment');
const BlogComment = mongoose.model('BlogComment');


exports.getRegistry = (req, res) => {
    res.redirect('http://babylist.com/penny-jordan-lamoreaux');
}

exports.addGalleryComment = async (req, res) => {
    req.body.author = req.user.id;
    req.body.gallery = req.params.id;
    const newComment = await (new GalleryComment(req.body));
    await newComment.save();
    res.redirect('back');
}

exports.addBlogComment = async (req, res) => {
    req.body.author = req.user.id;
    req.body.blog = req.params.id;
    const newComment = await (new BlogComment(req.body));
    await newComment.save();
    res.redirect('back');
}
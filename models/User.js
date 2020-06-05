const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserDetail = new Schema({
	username: String,
	email: String,
	password: String,
	firstname: String,
	lastname: String,
	active: Boolean
});

// generating a hash
UserDetail.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserDetail.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('userInfo', UserDetail, 'userInfo');
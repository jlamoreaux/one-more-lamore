const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
// const md5 = require('md5');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

// const bcrypt = require('bcrypt');

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		validate: [validator.isEmail, 'Invalid Email Address'],
		required: 'Please supply an email address'
	},
	firstName: {
		type: String,
		required: 'Please provide a first name',
		trim: true
	},
	lastName: {
		type: String,
		required: 'Please provide a last name',
		trim: true
	},
	active: {
		type: Boolean,
		default: false
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
});

// // generating a hash
// userSchema.methods.generateHash = function (password) {
// 	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// userSchema.methods.validPassword = function (password) {
// 	return bcrypt.compareSync(password, this.local.password);
// };

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
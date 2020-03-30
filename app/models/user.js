const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserDetail = new Schema({
    username: String,
    password: String
});

module.exports = mongoose.model('userInfo', UserDetail, 'userInfo');


// module.exports = mongoose.model('User', UserDetail);




// NEW CODE TO TEST GOES BELOW

// function registerUser(user) {
//     checkUserExists(user);
// }

// function checkUserExists(user) {
//     // let usernameExists = false;
//     // let emailRegistered = false;
//     UserDetails.findOne({
//         username: user.username
//     }, function (err, user) {
//         if (err) {
//             console.log(err);
//             return done(err);
//         }

//         if (user) {
//             console.log('user already exists')
//             return done(null, false);
//         }
//     })
//     UserDetails.findOne({
//         email: user.email
//     }, function (err, user) {
//         if (err) {
//             console.log(err);
//             return done(err);
//         }
//         if (user) {
//             console.log('this email address is already registered')
//             return done(null, false);
//         }
//     })
//     return user
// }

// class user {
//     constructor(username, password, email, firstname, lastname) {
//         this.username = username;
//         this.password = password;
//         this.email = email;
//         this.firstname = firstname;
//         this.lastname = lastname;
//     }
// }
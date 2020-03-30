const mongoose = require('mongoose');

function dbInit() {

    mongoose.connect('mongodb://localhost:27017/MyDatabase')

    const Schema = mongoose.Schema;
    const UserDetail = new Schema({
        username: String,
        password: String
    });
    const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

    // const MongoClient = require('mongodb').MongoClient;
    // const assert = require('assert');

    // // Connection URL
    // const url = 'mongodb://localhost:27017';

    // // Database Name
    // const dbName = 'lamoredb';

    // // Create a new MongoClient
    // const client = new MongoClient(url);

    // // Use connect method to connect to the Server
    // client.connect(function (err) {
    //     assert.equal(null, err);
    //     console.log("Connected successfully to server");

    //     const db = client.db(dbName);

    //     client.close();
    // });
    
}

module.exports = {
    dbInit
}

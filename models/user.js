"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config/database');
// User Schema
var UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
exports.User = module.exports = mongoose.model('User', UserSchema);
module.exports.getUserById = function (id, callback) {
    exports.User.findById(id, callback);
};
module.exports.getUserByUsername = function (username, callback) {
    var query = { username: username };
    exports.User.findOne(query, callback);
};
module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err)
                throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};
module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err)
            throw err;
        callback(null, isMatch);
    });
};
//# sourceMappingURL=user.js.map
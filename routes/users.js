"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
exports.User = require('../models/user');
// Register
router.post('/register', function (req, res, next) {
    var newUser = new exports.User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    exports.User.addUser(newUser, function (err, user) {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
        }
        else {
            res.json({ success: true, msg: 'User registered' });
        }
    });
});
// Authenticate
router.post('/authenticate', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    exports.User.getUserByUsername(username, function (err, user) {
        if (err)
            throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }
        exports.User.comparePassword(password, user.password, function (err, isMatch) {
            if (err)
                throw err;
            if (isMatch) {
                var token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            }
            else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        });
    });
});
// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    res.json({ user: req.user });
});
module.exports = router;
//# sourceMappingURL=users.js.map
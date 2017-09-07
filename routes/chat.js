"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// Database config
exports.config = require('../config/database');
// Connect to DB
mongoose.Promise = global.Promise;
mongoose.connect(exports.config.database, { useMongoClient: true })
    .then(function () { return console.log('Chat Connected to database ' + exports.config.database); })
    .catch(function (err) { return console.log('Chat Database error: ' + err); });
var io = require('socket.io').listen(4000).sockets;
var Chat = require('../models/Chat.js');
// socket io
io.on('connection', function (socket) {
    console.log('User connected');
    socket.on('disconnect', function () {
        console.log('User disconnected');
    });
    socket.on('save-message', function (data) {
        console.log(data);
        io.emit('new-message', { message: data });
    });
});
/* GET ALL CHATS */
router.get('/:room', function (req, res, next) {
    console.log(req.params.room);
    Chat.find({ room: req.params.room }, function (err, chats) {
        if (err)
            return next(err);
        res.json(chats);
    });
});
/* SAVE CHAT */
router.post('/', function (req, res, next) {
    Chat.create(req.body, function (err, post) {
        if (err)
            return next(err);
        res.json(post);
    });
});
module.exports = router;
//# sourceMappingURL=chat.js.map
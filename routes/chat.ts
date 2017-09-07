const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
// Database config
export const config = require('../config/database');
// Connect to DB
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {useMongoClient: true})
    .then(() =>  console.log('Chat Connected to database ' + config.database))
    .catch((err) => console.log('Chat Database error: ' + err)
);

const io = require('socket.io').listen(4000).sockets;
const Chat = require('../models/Chat.js');

// socket io
io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    socket.on('save-message', (data) => {
        console.log(data);
        io.emit('new-message', { message: data });
    });
});

/* GET ALL CHATS */
router.get('/:room', (req, res, next) => {
    console.log(req.params.room);
    Chat.find({ room: req.params.room }, (err, chats) => {
        if (err) return next(err);
        res.json(chats);
    });
});

/* SAVE CHAT */
router.post('/', (req, res, next) => {
    Chat.create(req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
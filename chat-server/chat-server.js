var _this = this;
var mongo = require('mongodb').MongoClient;
var client = require('socket.io').listen(4000).sockets;
// Connect to mongo
mongo.connect('mongodb://127.0.0.1/mongochat', function (err, db) {
    if (err) {
        throw err;
    }
    console.log('Mongo chat DB connected...');
    // Connect to Socket.io
    client.on('connection', function (socket) {
        var chat = db.collection('chats');
        // Function to send status
        module.exports.sendStatus = function (s) {
            socket.emit('status', s);
        };
        // Get chats from mongo collection
        chat.find().limit(100).sort({ _id: 1 }).toArray(function (err, res) {
            if (err) {
                throw err;
            }
            // Emit the messages
            socket.emit('output', res);
        });
        // Handle input events
        socket.on('input', function (data) {
            var name = data.name;
            var message = data.message;
            // Check for name and message
            if (name === '' || message === '') {
                // Send error status
                _this.sendStatus('Please enter your name and message');
            }
            else {
                // Insert message to db
                chat.insert({ name: name, message: message }, function () {
                    client.emit('message', data);
                    // Send status object
                    _this.sendStatus({
                        message: 'Message sent',
                        clear: true
                    });
                });
            }
        });
        // Handle clear
        socket.on('clear', function (data) {
            // Remove all chats from collection
            chat.remove({}, function () {
                // Emit cleared
                socket.emit('cleared');
            });
        });
    });
});
//# sourceMappingURL=chat-server.js.map
const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;

// Connect to mongo
mongo.connect('mongodb://127.0.0.1/mongochat', (err, db) => {
    if(err) {
        throw err;
    }

    console.log('Mongo chat DB connected...');

    // Connect to Socket.io
    client.on('connection', (socket) => {
        const chat = db.collection('chats');

        // Function to send status
        module.exports.sendStatus = (s) => {
            socket.emit('status', s);
        }

        // Get chats from mongo collection
        chat.find().limit(100).sort({_id:1}).toArray((err, res) => {
            if(err) {
                throw err;
            }

            // Emit the messages
            socket.emit('output', res);
        });

        // Handle input events
        socket.on('input', (data) => {
            let name = data.name;
            let message = data.message;

            // Check for name and message
            if(name === '' || message === '') {
                // Send error status
                this.sendStatus('Please enter your name and message');
            } else {
                // Insert message to db
                chat.insert({name: name, message: message}, () => {
                    client.emit('message', data);

                    // Send status object
                    this.sendStatus({
                        message: 'Message sent',
                        clear: true
                    });
                });
            }
        });

        // Handle clear
        socket.on('clear', (data) => {
            // Remove all chats from collection
            chat.remove({}, () => {
                // Emit cleared
                socket.emit('cleared');
            });
        });

    });
});
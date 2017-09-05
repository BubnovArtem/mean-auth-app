"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
// Database config
var config = require('./config/database');
// Connect to DB
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });
// On connection
mongoose.connection.on('connected', function () {
    console.log('Connected to database ' + config.database);
});
// On error
mongoose.connection.on('error', function (err) {
    console.log('Database error: ' + err);
});
// Use Express
var app = exports.express();
// Require Users Routes Module
var users = require('./routes/users');
// Require Tasks Routes Module
var tasks = require('./routes/tasks');
// Port number
var port = 3000;
// CORS Middleware
app.use(cors());
// Set Static Folder
app.use(exports.express.static(path.join(__dirname, 'public')));
// Body parser
app.use(bodyParser.json());
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
// Users Routes
app.use('/users', users);
// Planing Routes
app.use('/tasks', tasks);
// Index Route
app.get('/', function (req, res) {
    res.send('Invalid Endpoint');
});
// Redirect all invalid routes
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
// Start Server
app.listen(port, function () {
    console.log('Server started on port ' + port);
});
//# sourceMappingURL=app.js.map
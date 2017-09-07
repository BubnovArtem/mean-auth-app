export const express: any = require('express');
const path: any = require('path');
const bodyParser: any = require('body-parser');
const cors: any = require('cors');
const passport: any = require('passport');
const mongoose: any = require('mongoose');

// Database config
const config = require('./config/database');

// Connect to DB
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {useMongoClient: true})
    .then(() =>  console.log('Connected to database ' + config.database))
    .catch((err) => console.log('Database error: ' + err)
);

// Use Express
const app: any = express();

// Require Users Routes Module
const users = require('./routes/users');
// Require Tasks Routes Module
const tasks = require('./routes/tasks');
// Require Chat Routes Module
const chat = require('./routes/chat');

// Port number
const port: number = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

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
// Chat Routes
app.use('/chat', chat);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// Redirect all invalid routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});
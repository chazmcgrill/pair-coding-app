const express = require('express');
const http = require('http');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const morgan = require('morgan');

// Routes
const subjects = require('./routes/subjects');
const authRoutes = require('./routes/auth');
const conversations = require('./routes/conversations');

// database setup
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

// app setup
app.use(morgan('tiny'));
app.use(express.json({type: '*/*'}));
app.use(passport.initialize());
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true
}));

// sockets setup
let server = http.createServer(app);
const io = socketio(server)
app.set('socketio', io);

// routes setup
app.use('/api/subjects', subjects);
app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversations);

// server setup
const port = process.env.PORT || 5000;
server.listen(port, () => {
	console.log(`Server started on port ${port}`);
});



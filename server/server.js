const express = require('express');
const http = require('http');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();

const subjects = require('./routes/subjects');
const authRoutes = require('./routes/auth');

// connect to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

// app setup
app.use(express.json({type: '*/*'}));
app.use(cookieParser());
app.use(passport.initialize());

// Setup for CORS / Accept requests from our client
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));

// saveUninitialized: true allows us to attach the socket id to the session
// before we have athenticated the user
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true
}));

// sockets setup
let server = http.createServer(app);
const io = socketio(server)
app.set('socketio', io);

// routes
app.use('/api/subjects', subjects);
app.use('/api/auth', authRoutes);

// server setup
const port = process.env.PORT || 5000;
server.listen(port, () => {
	console.log(`Server started on port ${port}`);
});



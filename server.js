const express = require('express');
const path = require('path');
const http = require('http');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

require('dotenv').config();
require('./models/user');

const { Strategy: GithubStrategy } = require('passport-github');

const GITHUB_CONFIG = {
	clientID: process.env.GITHUB_CLIENT_ID,
	clientSecret: process.env.GITHUB_CLIENT_SECRET,
	callbackUrl: 'http://127.0.0.1:5000/api/auth/callback',
}

// Allowing passport to serialize and deserialize users into sessions
passport.serializeUser((user, cb) => cb(null, user))
passport.deserializeUser((obj, cb) => cb(null, obj))

// Adding each OAuth provider's strategy to passport
passport.use(new GithubStrategy(GITHUB_CONFIG, (accessToken, refreshToken, profile, cb) => cb(null, profile)))

let server = http.createServer(app);

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Authentication
app.use(cookieParser());
app.use(passport.initialize());

// Setup for CORS / Accept requests from our client
app.use(cors({
	origin: process.env.CLIENT_ORIGIN,
}));

// saveUninitialized: true allows us to attach the socket id to the session
// before we have athenticated the user
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true
}));

const subjects = require('./routes/subjects');
const authRoutes = require('./routes/auth');

// Connect to Mongo
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

// Connecting sockets to the server and adding them to the request 
// so that we can access them later in the controller
const io = socketio(server)
app.set('socketio', io);

// Use Routes
app.use('/api/subjects', subjects);
app.use('/api/auth', authRoutes);

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client', 'build')));
	
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}

// Server
const port = process.env.PORT || 5000;
server.listen(port, () => {
	console.log(`Server started on port ${port}`);
})
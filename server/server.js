const express = require('express');
const http = require('http');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const User = require('./models/user');
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

// Connecting sockets to the server and adding them to the request 
// so that we can access them later in the controller
let server = http.createServer(app);
const io = socketio(server)
app.set('socketio', io);

// server setup
const port = process.env.PORT || 5000;
server.listen(port, () => {
	console.log(`Server started on port ${port}`);
})

// MOVE OUT TO OWN FILE
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
passport.use(new GithubStrategy(GITHUB_CONFIG, (accessToken, refreshToken, profile, cb) => {

	// save the user to the database
	const user = {
		githubId: profile.id,
		displayName: profile.username,
		avatar: profile.photos[0].value
	}

	User.findOne({ githubId: user.githubId })
		.then(res => {
			if (res) {
				console.log('user is already signed up');
			}
			else {
				new User(user)
					.save()
					.catch(err => console.log(err));
			}
		});

	cb(null, profile)
}))

// Use Routes
app.use('/api/subjects', subjects);
app.use('/api/auth', authRoutes);
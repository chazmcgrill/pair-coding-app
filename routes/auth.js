const express = require('express');
const http = require('http');
const router = express.Router();
// const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const socketio = require('socket.io');
const { Strategy: GithubStrategy } = require('passport-github');

const GITHUB_CONFIG = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackUrl: 'localhost:5000/api/auth/callback',
}

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(passport.initialize);


app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(session({
  secret: 'testing123',
  resave: true,
  saveUninitialized: true,
}))

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

passport.use(new GithubStrategy(
  GITHUB_CONFIG, 
  (accessToken, refreshToken, profile, cb) => {
    const user = {
      name: profile.username,
      photo: profile.photos[0].value.replace(/_normal/, '')
    }
    cb(null, user);
  })
);

const githubAuth = passport.autheniticate('github');

const addSocketIdtoSession = (req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
}

router.get('/', addSocketIdtoSession, githubAuth)

router.get('/callback', githubAuth, (req, res) => {
  io.in(req.session.socketId).emit('user', req.user);
  res.end();
});

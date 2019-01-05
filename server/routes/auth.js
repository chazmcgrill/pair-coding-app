const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../services/passport');

// Setting up the passport middleware for each of the OAuth providers
const githubAuth = passport.authenticate('github');

// attach the socket id to the session
const socketIdMiddleware = (req, res, next) => {
  req.session.socketId = req.query['socket-id'];
  next()
}

// auth request route
router.get('/', socketIdMiddleware, githubAuth)

// successfull auth call back route
router.get('/callback', githubAuth, (req, res) => {
  const io = req.app.get('socketio');
  const user = {
    name: req.user.username,
    photo: req.user.photos[0].value,
    githubId: req.user.id
  }
  io.to(`${req.session.socketId}`).emit('github', user);
  res.end()
})

// auth logout route
router.get('/logout', socketIdMiddleware, (req, res) => {
  req.logout();
  io.to(`${req.session.socketId}`).emit('githubLogout', user);
  res.end()
})

module.exports = router;
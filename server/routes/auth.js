const express = require('express');
const router = express.Router();
const request = require('superagent');
const passport = require('passport');
const User = require('../models/user');
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
    name: req.user.profile.username,
    photo: req.user.profile.photos[0].value,
    githubId: req.user.profile.id
  }

  const accessToken = req.user.accessToken;
  io.to(`${req.session.socketId}`).emit('github', { user, accessToken });
  res.end()
});

// auth logout route
router.get('/logout', socketIdMiddleware, (req, res) => {
  req.logout();
  io.to(`${req.session.socketId}`).emit('githubLogout', user);
  res.end()
});

// get user from access token
router.get('/find-user', (req, res) => {
  const token = req.query.token;

  request.get('https://api.github.com/user')
    .set('Authorization', 'token ' + token)
    .then(function(result) {
      User.findOne({ githubId: result.body.id })
        .then(user => res.json({
          name: user.displayName,
          photo: user.avatar,
          githubId: user.githubId,
        }));
    })
});

module.exports = router;
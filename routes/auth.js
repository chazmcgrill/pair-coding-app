const express = require('express');
const router = express.Router();
const passport = require('passport');

// Setting up the passport middleware for each of the OAuth providers
const githubAuth = passport.authenticate('github')

// Routes that are triggered by the callbacks from each OAuth provider once 
// the user has authenticated successfully
router.get('/callback', githubAuth, (req, res) => {
  const io = req.app.get('io')
  const user = {
    name: req.user.username,
    photo: req.user.photos[0].value
  }
  io.in(req.session.socketId).emit('github', user)
  res.end()
})

// This custom middleware allows us to attach the socket id to the session
// With that socket id we can send back the right user info to the right 
// socket
router.use((req, res, next) => {
  req.session.socketId = req.query.socketId
  next()
})

// Routes that are triggered on the client
router.get('/', githubAuth)

module.exports = router
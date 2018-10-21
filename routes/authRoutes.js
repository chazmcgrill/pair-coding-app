const express = require('express');
const router = express.Router();
const passport = require('passport');

// User Model
const User = require('../models/user');

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.direct("/oops_not_auth")  // todo login page
  }
}

router.get('/', passport.authenticate('github'));

router.get('/callback',
  passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

module.exports = router;

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const mongoose = require('mongoose');
// const User = mongoose.model('Users');

const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id); // null is for errors *ie none*; user.id gets the mongodb id
  // this is so if we use other auth providers we have a consistent user id coming from mongo.
});

passport.deserializeUser((id, done) => {
  // search DB for user
  User.findById(id).then(user => {
    done(null, user)
  });
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.HOST + "/auth/gh/callback"
},
  function (token, tokenSecret, profile, cb) {
    User.findOne({ githubId: profile.id }).then(existingUser => {
      // console.log(profile);      
      if (existingUser) {
        return cb(null, existingUser);
      } else {
        new User({ githubId: profile.id, displayName: profile.displayName }).save()
          .then(user => cb(null, user));
      }
    });
  }
));
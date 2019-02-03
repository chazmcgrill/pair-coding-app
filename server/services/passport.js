// MOVE OUT TO OWN FILE
const passport = require('passport');
const { Strategy: GithubStrategy } = require('passport-github');
const User = require('../models/user');

// allows passport to serialize and deserialize users into sessions
passport.serializeUser((user, cb) => cb(null, user))
passport.deserializeUser((obj, cb) => cb(null, obj))

// 
const githubLogin = new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackUrl: 'http://127.0.0.1:5000/api/auth/callback',
        scope: ['read:user'],
}, (accessToken, refreshToken, profile, done) => {
    
    User.findOne({ githubId: profile.id }, (err, user) => {
        if (err) return done(err);
        if (user) return done(null, { accessToken, profile });
        const newUser = new User({
            githubId: profile.id,
            displayName: profile.username,
            avatar: profile.photos[0].value
        });
        newUser.save(err => {
            if (err) return done(err);
            return done(null, { accessToken, profile });
        })
    });
});

// use the strategy
passport.use(githubLogin);
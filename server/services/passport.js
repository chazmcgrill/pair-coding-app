// MOVE OUT TO OWN FILE
const passport = require('passport');
const { Strategy: GithubStrategy } = require('passport-github');
const User = require('../models/user');

const GITHUB_CONFIG = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackUrl: 'http://127.0.0.1:5000/api/auth/callback',
}

// // Allowing passport to serialize and deserialize users into sessions
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
}));
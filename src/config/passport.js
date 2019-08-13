const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new localStrategy({
    usernameField: 'email'
}, async (email, passport, done) => {
    const user = await User.findOne({email: email});
    if(!user) {
        return done(null, false, { message: 'User not found!'});
    }else {
        const match = await user.matchPasswords(passport);
        if(match) {
            return done(null, user, {message: 'Welcome '+user.name})
        }else {
            return done(null, false, {message: 'Incorrect password'});
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
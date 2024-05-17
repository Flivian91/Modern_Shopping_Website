const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/users');

const configureLocalStrategy = (passport) => {
    passport.use(new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, done) => {
        try {
            const user = await User.findOne({ email: username });
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            } else if (passwordMatch && user.password < 6) {
                return done(null, false, { message: 'Password must be more than 6 characters.' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).exec()
            .then(user => {
                done(null, user);
            })
            .catch(err => {
                done(err);
            });
    });
};

module.exports = configureLocalStrategy;
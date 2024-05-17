const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { Insert } = require('../controllers/registerUser');
const { isLoggedIn, isLoggedOut } = require('../middlewares/auth');
const router = express.Router();

router.get('/login', isLoggedOut, (req, res) => {
    const response = {
        title: 'Login',
        error: req.flash('error')
    };
    res.render('login.ejs', response);
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/logout', (req, res, done) => {
    req.logout((err) => {
        if (err) return done(err);
        res.redirect('/');
    });
});

router.post('/account/create-account', async (req, res) => {
    const user = req.body;
    password = user.password;
    confirmPassword = user.confirmPass;

    if (password !== confirmPassword) {
        req.flash('error', 'Passwords must match.');
        return res.redirect('/account');
    }

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        delete user.confirmPass;
        user.password = hashPassword;
        await Insert(user);
        res.redirect('/login');
    } catch (error) {
        if (error && error.code === 11000) {
            req.flash('error', 'Email already exists. Please log in.');
            return res.redirect('/account');
        } else {
            console.error('Error:', error);
            req.flash('error', 'An error occurred. Please try again.');
            res.redirect('/account');
        }
    }
});

module.exports = router;

const express = require('express');
const { isLoggedIn } = require('../middlewares/auth');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.get('/store', (req, res) => {
    res.render('store.ejs');
});

router.get('/account', (req, res) => {
    const error = req.flash('error');
    res.render('account.ejs', { error });
});

router.get('/checkout', (req, res) => {
    res.render('checkout.ejs');
});

router.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('dashboard.ejs', { name: req.user.firstName, email: req.user.email });
});

router.get('/product-overview', (req, res) => {
    res.render('product-quickviews.ejs');
});

router.get('/forgotPass', (req, res) => {
    const error = req.flash('error')
    res.render('forget-password.ejs', {error})
});

router.get('/account-manage', isLoggedIn, (req, res) => {
    res.render('account-manage.ejs', { name: req.user.firstName });
});

module.exports = router;

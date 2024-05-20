const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { Insert } = require('../controllers/registerUser');
const { isLoggedIn, isLoggedOut } = require('../middlewares/auth');
const router = express.Router();
const User = require('../models/users')

router.get('/login', isLoggedOut, (req, res) => {
    const response = {
        title: 'Login',
        error: req.flash('error'),
        success: req.flash('success')
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
    else if(password === confirmPassword && password.length < 8){
        req.flash('error', 'Passwords must be at least 8 characters')
        return res.redirect('/account')
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

router.post('/resetpassword', async (req,res)=>{
    console.log(req.body);
    const newDet = req.body;

    const userDoc = await User.findOne({email:newDet.email})
    if(!userDoc){
        req.flash('error', 'No user with that email found')
        res.redirect('/forgotpass')
    }
    
    const user = userDoc.toObject()
    const password = newDet.newPassword
    const confirmPass = newDet.confirmNewPass
    const recoveryQuiz = newDet.recoveryQuiz
    const recoveryAns = newDet.recoveryAns
    const Email = newDet.email

    if(recoveryQuiz === user.recoveryQuiz){
        if(recoveryAns === user.recoveryAns){
            if(password === confirmPass){
                try{
                    const newPass = await bcrypt.hash(password, 10)
                    //change user password details
                    await User.updateOne({email:Email}, {$set:{password: newPass}})
                    req.flash('success', 'Password changed successfully')
                    return res.redirect('/login')
                }
                catch(error){
                    console.log('erro: '+ error)
                }

            }
               else{
                req.flash('error', 'Passwords must match ')
                res.redirect('/forgotPass')
               }
        }
    }
    else{
        req.flash('error', 'Incorrect recovery details')
        res.redirect('/forgotpass')
    }
})

module.exports = router;

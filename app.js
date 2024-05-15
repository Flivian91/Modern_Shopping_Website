const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const { Insert } = require('./controllers/registerUser');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const User = require('./models/users');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Customers', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'views/public')));

// Middleware to parse url-encoded form data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Session middleware
app.use(session({
    secret: 'verygoodsecret',//later to store this in the env file
    resave: false,
    saveUninitialized: true
}));

// Flash messages middleware
app.use(flash());

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Passport LocalStrategy
passport.use(new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        // Find user by username
        const user = await User.findOne({ email: username});
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// Serialize and deserialize user functions
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).exec()
        .then(user => {
            done(null, user); // Assuming user is retrieved successfully
        })
        .catch(err => {
            done(err); // Handle error
        });
});


// Routes
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/store', (req, res) => {
    res.render('store.ejs');
});

app.get('/account', (req, res) => {
    const error = req.flash('error')
    res.render('account.ejs',{error});
});

app.get('/checkout', (req, res) => {
    res.render('checkout.ejs');
});

app.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('dashboard.ejs', { name: req.user.firstName, email: req.user.email });
});

app.get('/product-overview', (req, res) => {
    res.render('product-quickviews.ejs');
});

app.get('/user/likedItems', (req, res) => {
    res.send(res.body)
});

app.get('/login', isLoggedOut, (req, res) => {
    const response = {
        title: 'Login',
        error: req.flash('error')
    };
    res.render('login.ejs', response);
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/account-manage', isLoggedIn, (req, res) => {
    res.render('account-manage.ejs', { name: req.user.firstName });
});

app.post('/account/create-account', async (req, res) => {
    const user = req.body;
    password = user.password
    confirmPassword = user.confirmPass

    console.log(password + " " + confirmPassword)
    if (password !== confirmPassword) {
        req.flash('error', 'Passwords must match.');
        return res.redirect('/account');
    }

    try {
    const hashPassword = await bcrypt.hash(password, 10);
    delete user.confirmPas
    user.password = hashPassword
    await Insert(user)
    res.redirect('/login'); // Redirect only if registration is successful
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

app.get('/logout', (req, res, done) => {
    req.logout((err)=>{
        if(err) return done(err)
        res.redirect('/');
    });
    
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect('/');
}

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

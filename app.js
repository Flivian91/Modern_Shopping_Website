const express = require('express');
const path = require('path');
const app = express();
const port = process.env.port || 3000
const {connectToMongoDB} = require('./config/connectToMongo')
const {main} = require('./controllers/registerUser')
const bcrypt = require('bcrypt')
const localStrategy = require('passport-local').Strategy
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
let currentUser

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '/views/public')))
// Middleware to parse url-encoded form data
app.use(express.urlencoded({ extended: true }))

// Middleware to parse JSON bodies
app.use(express.json())
app.use(session({
	secret: "verygoodsecret",
	resave: false,
	saveUninitialized: true
}));

app.get('/', async (req, res) => {
     res.render('index.ejs')
})

app.get('/store', (req, res) => {
    res.render('store.ejs')
})

app.get('/account', (req, res) => {
    res.render('account.ejs')
})

app.get('/checkout', (req, res) => {
    res.render('checkout.ejs')
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard.ejs', {name: currentUser.firstName, email: currentUser.email})
})

app.get('/product-overview', (req, res) => {
    res.render('product-quickviews.ejs')
})

app.get('/login', isLoggedOut, (req, res) => {
	const response = {
		title: "Login",
		error: req.query.error
	}

	res.render('login', response);
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login?error=true'
}));

app.get('/account-manage', (req, res) => {
    res.render('account-manage.ejs', {name: currentUser.firstName})
})

//connectToMongoDB()

app.post('/account/create-account', async (req, res) =>{

    const user = await req.body
    currentUser = user
    console.log(user)
    const password = await user.password
    const confirmPassword = await user.confirmPass

    console.log("Password is:  " + password + "Confirm pass is: " + confirmPassword)
    if(password === confirmPassword){
        try{
            const hashPass = await bcrypt.hash(password, 10)
            delete user.confirmPass
            user.password = hashPass
            await main(user)
            console.log("data inserted successfully")
            res.redirect('/login')
        }
        catch(error){
            if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
                // Duplicate email error
                res.send('<h3>Email already exists</h3>')
                res.redirect('/account')
                console.error('Email already exists:', error.keyValue.email);
        }
        else{
            console.log("Erro : " + error)
        }
    }
    }

    else{
        console.log("Pass words must match");
    }
})

app.get('/users/current', (req, res) =>{
    res.json(currentUser)
})

// Passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

passport.use(new localStrategy(function (username, password, done) {
	User.findOne({ username: username }, function (err, user) {
		if (err) return done(err);
		if (!user) return done(null, false, { message: 'Incorrect username.' });

		bcrypt.compare(password, user.password, function (err, res) {
			if (err) return done(err);
			if (res === false) return done(null, false, { message: 'Incorrect password.' });
			
			return done(null, user);
		});
	});
}));

function isLoggedIn(req, res, next) {
	if (passport.authenticate()) return next();
	res.redirect('/login');
}

function isLoggedOut(req, res, next) {
	if (!passport.authenticate()) return next();
	res.redirect('/');
}


app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});



app.listen(port, () => {
    console.log("Server open at port + ", port)
})
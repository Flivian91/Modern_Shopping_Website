const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const connectDB = require('./config/connectToCustomersDB');
const configureLocalStrategy = require('./passport/localStrategy');
const authRoutes = require('./routes/authRoutes');
const viewRoutes = require('./routes/viewRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'views/public')));

// Middleware to parse url-encoded form data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Session middleware
app.use(session({
    secret: 'verygoodsecret', // Store this in the env file
    resave: false,
    saveUninitialized: true
}));

// Flash messages middleware
app.use(flash());

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport LocalStrategy
configureLocalStrategy(passport);

// Routes
app.use(authRoutes);
app.use(viewRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

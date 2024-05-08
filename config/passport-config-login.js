const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const argon2 = require('argon2');
const { MongoClient } = require('mongodb');

const app = express();
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

// Connect to MongoDB
client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');
  db = client.db('Customer');
})

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

// Configure Passport LocalStrategy for authentication
passport.use(new LocalStrategy(
  async (email, password, done) => {
    try {
      const user = await db.collection('users').findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      const match = await argon2.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.collection('users').findOne({ _id: id });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
})

app.post('/auth/login', passport.authenticate('local'), (req, res) => {
  // Authentication successful, redirect or respond as needed
  res.json({ message: 'Login successful', user: req.user });
})

// Export the Express app
module.exports = app;

// models/user.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    recoveryQuiz: { type: String, required: true },
    recoveryAns: { type: String, required: true }
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
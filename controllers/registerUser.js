const User = require('../models/users');

async function Insert(newUser) {
    try {
        const newuser = new User(newUser);
        await newuser.save(); // Wait for the save operation to complete
        console.log('User saved to db successfully');
        return true; // Indicate success
    } catch (error) {
        console.error('Error:', error);
        throw error; // Propagate the error back to the caller
    }
}

module.exports = {Insert}
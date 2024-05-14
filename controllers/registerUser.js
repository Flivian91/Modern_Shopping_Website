const User = require('../models/users')
async function Insert(newUser) {
    try {
        
        // Get reference to the users collection
       const newuser = await new User(newUser)
       newuser.save()
       console.log('User daved to db successfully')

    } catch (error) {
        console.error('Error:', error)
    } 
}

module.exports = { Insert }

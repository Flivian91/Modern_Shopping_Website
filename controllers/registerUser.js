const { connectToMongoDB } = require('../config/connectToMongo')
const { MongoClient } = require('mongodb')
const uri = 'mongodb://127.0.0.1:27017' // MongoDB connection URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })


async function main(newUser) {
    try {
        
        // Get reference to the users collection
        const db = client.db('Customer');
        const usersCollection = db.collection('users')

        // Create unique index on email field
        await usersCollection.createIndex({ email: 1 }, { unique: true })

        // Insert a new user

        const result = await usersCollection.insertOne(newUser)
        console.log(`User inserted with _id: ${result.insertedId}`)

    } catch (error) {
        console.error('Error:', error)
    } finally {
        // Close the connection
        await client.close()
        console.log('Connection closed')
    }
}

module.exports = { main }

// connectToMongoDb.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017'; // MongoDB connection URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client; // Return the MongoDB client instance
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = { connectToMongoDB };

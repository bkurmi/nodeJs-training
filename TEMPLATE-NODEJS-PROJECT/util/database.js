// Import MongoClient from mongodb
const { MongoClient } = require('mongodb')
// Connection URL
const url = 'mongodb+srv://drl-amp:humza123@amp-cluster.r0obtny.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB server's URL
const client = new MongoClient(url);
// Database Name
const dbName = 'myNodeJsDatabase'; // Replace with your database name

let dbInstance = null;

async function connectToDB() {
  if (!dbInstance) {
    try {
      await client.connect();
      dbInstance = client.db(dbName);
      console.log("Connected successfully to MongoDB server");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err.stack);
      throw err;
    }
  }
  return dbInstance;
}

module.exports = { connectToDB };
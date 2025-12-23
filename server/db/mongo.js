const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');
const dbName = 'intern_app';

async function connectMongo() {
  if (!client.isConnected) await client.connect();
  return client.db(dbName).collection('users');
}

module.exports = { connectMongo };
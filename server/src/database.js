const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: '../../config.env' });

const uri = process.env.CONNECTION_URL || '';
const client = new MongoClient(uri);
let _db;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    _db = client.db('albums');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
}

const getDb = () => {
  return _db;
};

module.exports = {
  getDb,
  connectToDatabase,
};

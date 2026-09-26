const { MongoClient } = require('mongodb');

let cachedClient = null;
let cachedDb = null;

async function getDb() {
  if (cachedDb) return cachedDb;
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  cachedClient = client;
  cachedDb = client.db(process.env.MONGODB_DB || 'portfolio');
  return cachedDb;
}

function checkAdminSecret(req) {
  const provided = req.headers['x-admin-secret'];
  return !!provided && provided === process.env.ADMIN_SECRET;
}

module.exports = { getDb, checkAdminSecret };

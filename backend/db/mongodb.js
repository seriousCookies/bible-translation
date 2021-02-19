const MongoClient = require("mongodb").MongoClient;
const mongo_url = process.env.MONGODB_ATLAS_CONNECTION_STRING;
let _db;
const dbName = process.env.DB_NAME;

const connectDB = async (callback) => {
  try {
    MongoClient.connect(mongo_url, (err, client) => {
      _db = client.db(dbName);
      return callback(err);
    });
  } catch (e) {
    throw e;
  }
};

const getDB = () => _db;

const disconnectDB = () => _db.close();

module.exports = { connectDB, getDB, disconnectDB };

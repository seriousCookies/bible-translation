const MongoClient = require("mongodb").MongoClient;
const mongo_url = process.env.MONGODB_ATLAS_CONNECTION_STRING;
let _db;
const dbName = process.env.DB_NAME;

const connectDB = async (callback) => {
  try {
    MongoClient.connect(
      mongo_url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, client) => {
        _db = client.db(dbName);
        return callback(err);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const getDB = () => _db;

const disconnectDB = () => _db.close();

module.exports = { connectDB, getDB, disconnectDB };

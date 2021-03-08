const MongoClient = require("mongodb").MongoClient;
const mongo_url = process.env.MONGODB_LOCAL;
let _db;
let client;
const dbName = process.env.DB_NAME;

const connectDB = async (callback) => {
  try {
    MongoClient.connect(
      mongo_url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, _client) => {
        client = _client;
        console.log(client, "here");
        _db = client.db(dbName);
        return callback(err);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const getDB = () => _db;

const disconnectDB = () => client.close();

module.exports = { connectDB, getDB, disconnectDB };

const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const client = new MongoClient(process.env.COSMODB_CONNECTION_STRING, {
  auth: {
    user: process.env.COSMOSDB_USER,
    password: process.env.COSMOSDB_PASSWORD,
  },
  useNewUrlParser: true,
  useUnifiedTopology: false,
  retryWrites: false,
  dbName: process.env.COSMOSDB_DBNAME,
});

client.connect(async (err) => {
  if (err) {
    console.log(err, "couldn't connect to MongoDB here");
  } else {
    db = client.db("chapters");
    console.log("MONGOdb connected");
  }
});

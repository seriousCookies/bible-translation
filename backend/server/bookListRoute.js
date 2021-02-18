const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const uri = process.env.MONGODB_ATLAS_CONNECTION_STRING;

router.get("/", (req, res) => {
  mongodb.MongoClient.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    async (error, client) => {
      if (error) {
        console.log(error);
        process.exit(1);
      }
      const list = [];
      const database = client.db("bible");
      const collection = database.collection("bibleInfo");
      const query = { overallOrder: { $gt: 0 } };
      const options = {
        sort: { overallOrder: 1 },
        projection: {
          _id: 0,
          overallOrder: 1,
          pinyin: 1,
          chinese: 1,
          english: 1,
          testament: 1,
        },
      };
      const cursor = collection.find(query, options);
      if ((await cursor.count()) === 0) {
        res.json("No documents found!");
      }
      await cursor.forEach((i) => {
        collection.updateOne(
          { english: i.english },
          { $set: { overallOrder: parseInt(i.overallOrder) } }
        );
        list.push(i);
      });
      res.json(list);
    }
  );
});
module.exports = router;

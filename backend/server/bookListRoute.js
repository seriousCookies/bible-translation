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
        // sort returned documents in ascending order by title (A->Z)
        sort: { overallOrder: 1 },
        // Include only the `title` and `imdb` fields in each returned document
        projection: { _id: 0, overallOrder: 1, chinese: 1, english: 1 },
      };
      const cursor = collection.find(query, options);
      if ((await cursor.count()) === 0) {
        res.json("No documents found!");
      }
      // replace console.dir with your callback to access individual elements
      await cursor.forEach((i) => {
        collection.update(
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

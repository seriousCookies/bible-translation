const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const uri = process.env.MONGODB_ATLAS_CONNECTION_STRING;

router.get("/", (req, res) => {
  const { book, chapter, verse } = req.query;
  console.log(req.query);
  mongodb.MongoClient.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    (error, client) => {
      if (error) {
        console.log(error);
        process.exit(1);
      }
      const database = client.db("chinese-bible");
      const collection = database.collection("ch-bible-chapter");
      const query = {};
      book && (query.BookName = book);
      chapter && (query.BookChapter = chapter);
      verse && (query.verseNumber = verse);
      console.log(query);
      const projection = { ChineseVerse: 1 };
      collection &&
        collection
          .find(query, projection)
          .sort({ name: 1 })
          .toArray()
          .then(async (items) => {
            console.log(`Successfully found ${items.length} documents.`);
            const results = await items.map((item) => item.ChineseVerse);
            res.json(results);
          })
          .catch((err) => console.error(`Failed to find documents: ${err}`));
    }
  );
});
module.exports = router;

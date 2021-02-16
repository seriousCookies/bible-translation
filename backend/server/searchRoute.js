const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const uri = process.env.MONGODB_ATLAS_CONNECTION_STRING;

const getData = (database, q, verse) =>
  database
    .find(q)
    .toArray()
    .then((items) =>
      items.map((item) => `${item.verseNumber}.  ${item[verse]}`)
    );

router.get("/", (req, res) => {
  const { translation, book, chapter, verse } = req.query;
  console.log(req.query);
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
      const database = client.db("chinese-bible");
      const chinese = {
        db: database.collection("ch-bible-chapter"),
        verse: "ChineseVerse",
      };
      const pinYin = {
        db: database.collection("pinyin-ch-bible-chapter"),
        verse: "pinYinVerse",
      };

      const query = {};
      book && (query.BookName = book);
      chapter && (query.BookChapter = chapter);
      verse && (query.verseNumber = verse);
      const chineseRes =
        chinese.db && (await getData(chinese.db, query, chinese.verse));
      const pinYinRes =
        pinYin.db && (await getData(pinYin.db, query, pinYin.verse));
      let rawData = [];
      rawData.push(pinYinRes);
      rawData.push(chineseRes);
      const data = rawData
        .flat()
        .sort((a, b) => a.split(" ")[0] - b.split(" ")[0]);
      res.json(data);
      // chineseDB &&
      //   chineseDB
      //     .find(query)
      //     .toArray()
      //     .then(async (items) => {
      //       console.log(`Successfully found ${items.length} documents.`);
      //       const chineseResults = await items
      //         .sort((a, b) => a.verseNumber - b.verseNumber)
      //         .map((item) => `${item.verseNumber}.  ${item.ChineseVerse}`);
      //       res.json(chineseResults);
      //     })
      //     .catch((err) => console.error(`Failed to find documents: ${err}`));
    }
  );
});
module.exports = router;

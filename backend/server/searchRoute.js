const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const uri = process.env.MONGODB_ATLAS_CONNECTION_STRING;

const getData = (database, q, verse) =>
  database
    .find(q)
    .toArray()
    .then((items) =>
      items.map(
        (item) => `${item.verseNumber}.  ${item[verse].replace(/\d/g, "")}`
      )
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
      let language;
      const chinese = {};
      const pinYin = {};
      const english = {};
      switch (translation) {
        case "en":
          language = "english-bible";
          english.verse = "esvVerse";
          break;
        case "ch":
          language = "chinese-bible";
          chinese.verse = "ChineseVerse";
          pinYin.verse = "pinYinVerse";
          break;
        default:
          language = "chinese-bible";
          break;
      }
      const database = client.db(language);
      pinYin.dbCollection = database.collection("pinyin-ch-bible-chapter");
      chinese.dbCollection = database.collection("ch-bible-chapter");
      english.dbCollection = database.collection("esv-en-bible-chapter");
      const query = {};
      book && (query.BookName = book);
      chapter && (query.BookChapter = chapter);
      verse && (query.verseNumber = verse);
      let rawData = [];

      switch (translation) {
        case "en":
          const esvRes =
            english.dbCollection &&
            (await getData(english.dbCollection, query, english.verse));
          rawData.push(esvRes);
          break;

        case "ch":
          const chineseRes =
            chinese.dbCollection &&
            (await getData(chinese.dbCollection, query, chinese.verse));
          const pinYinRes =
            pinYin.dbCollection &&
            (await getData(pinYin.dbCollection, query, pinYin.verse));
          rawData.push(pinYinRes);
          rawData.push(chineseRes);
          break;
        default:
          break;
      }
      const data = await rawData
        .flat()
        .sort((a, b) => a.split(" ")[0] - b.split(" ")[0]);
      res.json(data);
    }
  );
});
module.exports = router;

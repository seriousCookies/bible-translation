const express = require("express");
const router = express.Router();
const MongoDB = require("../db/mongodb");
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
  const query = {};
  book && (query.BookName = book);
  chapter && (query.BookChapter = chapter);
  verse && (query.verseNumber = verse);
  const rawData = [];
  const collection = {};
  MongoDB.connectDB(async (err) => {
    try {
      if (err) console.log(err, "err connecting to DB");
      const db = MongoDB.getDB();
      switch (translation) {
        case "en":
          collection.english = db.collection("esv-en-bible-chapter");
          const esvRes = await getData(collection.english, query, "esvVerse");
          rawData.push(esvRes);
          break;
        case "ch":
          collection.chinese = await db.collection("ch-bible-chapter");
          collection.pinyin = await db.collection("pinyin-ch-bible-chapter");
          const pinYinRes = await getData(
            collection.pinyin,
            query,
            "pinYinVerse"
          );
          rawData.push(pinYinRes);
          const chineseRes = await getData(
            collection.chinese,
            query,
            "ChineseVerse"
          );
          rawData.push(chineseRes);

          break;
        default:
          rawData.push("choose a translation");
          break;
      }
      const data = await rawData
        .flat()
        .sort((a, b) => a.split(" ")[0] - b.split(" ")[0]);
      const binned = data.reduce((result, word) => {
        const number = word.match(/\d*/)[0];
        result[number] = result[number] || [];
        result[number].push(word.replace(/\d*./, ""));
        return result;
      }, {});
      MongoDB.disconnectDB();
      return res.status(200).json(binned);
    } catch (error) {
      console.log(error);
    }
  });
});
module.exports = router;

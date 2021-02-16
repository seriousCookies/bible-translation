const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const rp = require("request-promise");
const cheerio = require("cheerio");
const baseURL = "https://www.biblestudytools.com/";
const bibleVersion = "esv/"; //change this to get different versions
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_ATLAS_CONNECTION_STRING;
const client = new MongoClient.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const getHref = (parseHtml, html, array) => {
  return Array.from(cheerio(parseHtml, html)).map((book) =>
    array.push(book.attribs.href)
  );
};
const eachBook = ["#testament-O > div > a", "#testament-N > div > a"];
const eachChapter = ["#content-column > div > div > div > div > div > a"];
const eachVerse = [
  "#content-column > div.row.bible-container > div > div > div > div > .verse:last-child > .verse-number > strong",
  "#content-column > div.row.bible-container > div > div > div > div > .verse",
];

const getData = (url, parseHtml, getHref) =>
  rp(url)
    .then((html) => {
      const rawURLs = [];
      parseHtml.map((string) => getHref(string, html, rawURLs));
      return Array.from(new Set(rawURLs));
    })
    .catch((err) => {
      console.log("error:", err);
    });

const testing = async (chapterURL) => {
  let a = await rp(chapterURL)
    .then((html) => {
      const regex = /\/(\w*)\/([\d\-\w]*)\/(\d*).htm/;
      let bookInfo = {
        translationCode: chapterURL.match(regex)[1],
        book: chapterURL.match(regex)[2],
        chapter: chapterURL.match(regex)[3],
      };
      const vNum = cheerio(eachVerse[0], html).text();
      const arr = new Array(parseInt(vNum));
      const verseNumbers = arr.fill(0).map((a, i) => i + 1);
      const rawVerses = [];
      verseNumbers.map((verseNumber) => {
        const verseHtmlPath = `${eachVerse[1]} > .verse-${verseNumber} `;
        const verse = cheerio(verseHtmlPath, html).text();
        return rawVerses.push(verse);
      });
      verses = rawVerses.map((verse) => verse.trim());

      let numberedVerses = {};
      for (let i = 0; i < verseNumbers.length; i++) {
        const number = verseNumbers[i];
        numberedVerses[number] = verses[i];
      }
      return Object.entries(numberedVerses).map((singleVerse) => {
        const chapter = {
          [bookInfo.translationCode + "URL"]: chapterURL,
          TranslationCode: bookInfo.translationCode,
          BookName: bookInfo.book,
          BookChapter: bookInfo.chapter,
          verseNumber: singleVerse[0],
          esvVerse: singleVerse[1],
        };
        return chapter;
      });
    })
    .then((data) => data);
  return a;
};

const run = async (documentURL) => {
  try {
    const db = (await client).db("english-bible");
    const col = db.collection("esv-en-bible-chapter");
    return await testing(documentURL).then((data) => {
      return data.map(async (verseData) => {
        await col.insertOne(verseData);
      });
    });
  } catch (e) {
    console.log(documentURL, e, "error here");
    process.exit();
  }
};

const getAllChapterURLS = async (bibleVersion) => {
  const allBookUrls = [];
  const allChapterUrls = [];
  await getData(baseURL + bibleVersion, eachBook, getHref).then(
    (allBookURLS) => {
      return allBookUrls.push(allBookURLS);
    }
  );
  const chapURLS = await allBookUrls.flat().map(async (bookURL) => {
    return await getData(bookURL, eachChapter, getHref);
  });
  await Promise.all(chapURLS).then((data) => allChapterUrls.push(data));
  return allChapterUrls.flat(2);
};

getAllChapterURLS(bibleVersion)
  .then(async (data) => {
    let a;
    console.log(data.length, "length");
    for (let i = 0; i < data.length; i++) {
      await run(data[i]);
      a = i;
    }
    return a;
  })
  .then((data) => console.log(data, "done now!"))
  .catch((err) => console.log(err));

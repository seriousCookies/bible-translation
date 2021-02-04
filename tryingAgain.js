require("dotenv").config();
const rp = require("request-promise");
const cheerio = require("cheerio");
const baseURL = "https://www.biblestudytools.com/";
const bibleVersion = "cuvs/";
const Chapter = require("./model");
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.COSMODB_CONNECTION_STRING;
const client = new MongoClient(uri, {
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
  "#content-column > div.row.bible-container > div > div > div > div > .verse > .verse-number",
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

// getData(baseURL + bibleVersion, eachBook, getHref).then((allBookURLS) => {
//   const allChapters = allBookURLS.map(async (bookURL) => {
//     return await getData(bookURL, eachChapter, getHref).then((allChapterURLS) => {
//       return await getData(allChapterURLS) // working on this part
//     });
//   });
//   Promise.all(allChapters).then((chapters) => console.log(chapters[0].length)); //Array of books with array of chapters
// });

const testing = async () => {
  const mockURL = "https://www.biblestudytools.com/cuvs/shipian/1.html";
  let a = await rp(mockURL)
    .then((html) => {
      const regex = /\/(\w*)\/(\w*)\/(\d*).htm/;
      let bookInfo = {
        translationCode: mockURL.match(regex)[1],
        book: mockURL.match(regex)[2],
        chapter: mockURL.match(regex)[3],
      };
      const vNum = cheerio(eachVerse[0], html).text();
      const verseNumbers = vNum.split("");
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

      const chapter = {
        url: mockURL,
        TranslationCode: bookInfo.translationCode,
        BookName: bookInfo.book,
        BookChapter: bookInfo.chapter,
        ChineseVerses: JSON.stringify(numberedVerses),
      };
      return chapter;
    })
    .then((data) => data);
  return a;
};

const run = async () => {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db("chinese-bible");
    const col = db.collection("chapters");
    const query = {
      url: "https://www.biblestudytools.com/cuvs/shipian/1.htmml",
    };
    console.log(await col.findOne(query));
    await testing().then(async (data) => {
      await col.insertOne(data);
      console.log("Done!");
    });
    client.close();
    //process.exit();
  } catch (e) {
    console.log(e, "error here");
    process.exit();
  }
};
run();

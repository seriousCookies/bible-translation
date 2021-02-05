require("dotenv").config();
const rp = require("request-promise");
const cheerio = require("cheerio");
const baseURL = "https://www.biblestudytools.com/";
const bibleVersion = "cuvs/";
const Chapter = require("./model");
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.COSMODB_CONNECTION_STRING;
const client = MongoClient.connect(uri, {
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

const testing = async (chapterURL) => {
  let a = await rp(chapterURL)
    .then((html) => {
      const regex = /\/(\w*)\/(\w*)\/(\d*).htm/;
      let bookInfo = {
        translationCode: chapterURL.match(regex)[1],
        book: chapterURL.match(regex)[2],
        chapter: chapterURL.match(regex)[3],
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
      return Object.entries(numberedVerses).map((singleVerse) => {
        const chapter = {
          [bookInfo.translationCode + "URL"]: chapterURL,
          TranslationCode: bookInfo.translationCode,
          BookName: bookInfo.book,
          BookChapter: bookInfo.chapter,
          verseNumber: singleVerse[0],
          ChineseVerse: singleVerse[1],
        };
        return chapter;
      });
    })
    .then((data) => data);
  return a;
};

const run = async (documentURL) => {
  try {
    const db = (await client).db("chinese-bible");
    const col = db.collection("chapters");
    const query = {
      $or: [{ cuvpURL: documentURL }, { cuvsURL: documentURL }],
    };
    if ((await col.findOne(query)) === null) {
      await testing(documentURL).then(async (data) => {
        return data.map(async (verseData) => {
          await col.insertOne(verseData);
          console.log("Done!");
        });
      });
    } else {
      console.log(await col.findOne(query), "already exists");
      process.exit();
    }
    process.exit();
  } catch (e) {
    console.log(e, "error here");
    process.exit();
  }
};

const getAllChapterURLS = async () => {
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

getAllChapterURLS()
  .then(async (data) => await run(data[1]))
  .catch((err) => console.log(err));

const main = async () => {
  await getData(baseURL + bibleVersion, eachBook, getHref)
    .then(async (allBookURLS) => {
      console.log("this 1");
      await allBookURLS.map(async (bookURL) => {
        await getData(bookURL, eachChapter, getHref).then(
          async (allChapterURLS) => {
            // console.log("ChapterURL");
            await allChapterURLS.map(async (chapterURL) => {
              await run(chapterURL);
              console.log("runnnnn");
              return "work dammit";
            });
            return "popp2";
          }
        );
        return "poop";
      });
      return "Success";
    })
    .then((data) => console.log(data, "here "))
    .catch((err) => console.log(err));
};

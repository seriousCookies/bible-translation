const rp = require("request-promise");
const cheerio = require("cheerio");
const baseURL = "https://www.biblestudytools.com/";
const bibleVersion = "cuvs/";

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
const mockURL = "https://www.biblestudytools.com/cuvs/shipian/1.html";
rp(mockURL).then((html) => {
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
  console.log(JSON.stringify(numberedVerses));
});

const rp = require("request-promise");
const $ = require("cheerio");
const url =
  "https://www.christunite.com/index.php/chinese-bible/chinesepinyinbible";

const getRawData = (parseHtml, html, array) => {
  return Array.from($(parseHtml, html)).map((book) =>
    array.push(book.attribs.href)
  );
};

rp(url)
  .then((html) => {
    const rawAllUrls = [];
    const parseHtml = [
      "#s5_component_wrap_inner > div.item-page > div > div > table > tbody > tr > td > table > tbody > tr > td > a",
      "#s5_component_wrap_inner > div.item-page > div > div > table > tbody > tr > td > a",
      "#s5_component_wrap_inner > div.item-page > div > div > table > tbody > tr > td > p > a",
    ];
    parseHtml.map((string) => getRawData(string, html, rawAllUrls));
    const uniqueUrls = Array.from(new Set(rawAllUrls));
    console.log(uniqueUrls.length);
  })
  .catch((err) => {
    console.log("error:", err);
  });

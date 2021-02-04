const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  TranslationCode: String,
  Testament: String,
  BookName: String,
  BookChapter: String,
  ChineseVerses: String,
  PinyinVerses: String,
});
module.exports = mongoose.model("Chapters", chapterSchema);

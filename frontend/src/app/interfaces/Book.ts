export interface Book {
  chinese: string;
  pinyin: string;
  english: string;
  overallOrder: string;
  testament: string;
}

export interface BookDets {
  bookNameEN?: string;
  bookNameCH?: string;
  chapter?: Number;
}

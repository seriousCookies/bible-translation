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
  chapter?: chapterDets;
}

export interface chapterDets {
  chapter: number;
  chapterLength: number;
}

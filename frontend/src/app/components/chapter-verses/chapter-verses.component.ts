import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FetchdataService } from '../../service/fetchdata.service';
import { Book, BookDets } from '../../interfaces/Book';

@Component({
  selector: 'app-chapter-verses',
  templateUrl: './chapter-verses.component.html',
  styleUrls: ['./chapter-verses.component.scss'],
})
export class ChapterVersesComponent implements OnChanges {
  @Input() bookDetails?: BookDets;
  searchString?: Array<string>;
  verseList?: Array<object>;
  allData?: Array<object>;
  combinedData?: Object;
  constructor(private FetchdataService: FetchdataService) {}
  showSpinner: Boolean = false;
  searchStringGenerator(
    en: String | undefined,
    ch: String | undefined,
    chapter: Number | undefined
  ) {
    const enString = `search/?book=${en}&chapter=${chapter}&translation=en`;
    const chString = `search/?book=${ch}&chapter=${chapter}&translation=ch`;
    return [chString, enString];
  }
  parsedIndex(index: string) {
    return parseInt(index) + 1;
  }

  addSpace(verse: any, index: number) {
    switch (index) {
      case 0:
        return verse[0];
      case 1:
        return verse[1];
      case 2:
        return verse[2];
      default:
    }
  }

  loadData() {
    this.showSpinner = true;
    setTimeout(() => (this.showSpinner = false), 500);
  }
  public keepOriginalOrder = (a: any) => a.key;

  async ngOnChanges(changes: SimpleChanges) {
    const bookNameEN = this.bookDetails?.bookNameEN
      ?.toLocaleLowerCase()
      .replace(/\s/, '-');
    const chapter = this.bookDetails?.chapter;
    this.searchString = this.searchStringGenerator(
      bookNameEN,
      this.bookDetails?.bookNameCH,
      chapter
    );
    this.bookDetails && this.verseList && this.loadData();
    this.allData = [];
    this.searchString?.map((string) => {
      this.FetchdataService.sendGetRequest(string).subscribe((data) => {
        this.allData?.push(data);
        const testing = this.allData?.reduce((a: any, b: any) => {
          return Object.keys(a).map((key) => {
            return [a[key], b[key]].flat(1);
          });
        });
        this.combinedData = testing;
        console.log(this.combinedData, 'here now');
      });
    });
  }
}

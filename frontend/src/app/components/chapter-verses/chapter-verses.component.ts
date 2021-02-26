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

  addSpace(verse: any, index: number) {
    console.log(verse, 'in Addspace');
    return index === 0 ? verse[0] : verse[1];
  }

  loadData() {
    this.showSpinner = true;
    setTimeout(() => (this.showSpinner = false), 500);
  }
  public keepOriginalOrder = (a: any) => a.key;

  async ngOnChanges(changes: SimpleChanges) {
    this.verseList = [];
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
        console.log(this.allData, 'nothing still?');
      });
      console.log(this.allData, 'done yet?');
    });
    console.log(this.allData, this.searchString, 'here now');
  }
}

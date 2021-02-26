import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FetchdataService } from '../../service/fetchdata.service';
import { BookDets } from '../../interfaces/Book';

@Component({
  selector: 'app-chapter-verses',
  templateUrl: './chapter-verses.component.html',
  styleUrls: ['./chapter-verses.component.scss'],
})
export class ChapterVersesComponent implements OnChanges {
  @Input() bookDetails?: BookDets;
  searchString?: Array<string>;
  verseList?: Array<object>;
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
    this.searchString?.map((string) => {
      this.FetchdataService.sendGetRequest(string).subscribe((data) => {
        console.log(data, 'logging now');
        return this.verseList?.push(...data);
      });
    });
    console.log(this.verseList, this.searchString, 'here now');
  }
}

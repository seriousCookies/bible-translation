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
  searchString?: string;
  verseList?: Array<object>;
  constructor(private FetchdataService: FetchdataService) {}
  showSpinner: Boolean = false;

  addSpace(verse: any, index: number) {
    return index === 0 ? verse[0] : verse[1];
  }

  loadData() {
    this.showSpinner = true;
    setTimeout(() => (this.showSpinner = false), 500);
  }
  public keepOriginalOrder = (a: any) => a.key;

  async ngOnChanges(changes: SimpleChanges) {
    const bookName = this.bookDetails?.bookName
      ?.toLocaleLowerCase()
      .replace(/\s/, '-');
    const chapter = this.bookDetails?.chapter;
    this.searchString = `search/?book=chuangshiji&chapter=${chapter}&translation=ch`;
    this.bookDetails && this.verseList && this.loadData();
    this.FetchdataService.sendGetRequest(this.searchString).subscribe(
      (data) => {
        console.log(Object.values(data)[0], data, 'here now');
        this.verseList = data;
      }
    );
  }
}

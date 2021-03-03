import { Component, Input, OnChanges } from '@angular/core';
import { BookDets } from '../../interfaces/Book';
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges {
  @Input() bookDetails?: BookDets;
  pageChange(e: number) {
    this.p = e;
    if (this.bookDetails?.chapter !== undefined)
      this.bookDetails.chapter.chapter = e;
  }

  collection: number[] = [];
  p: any;
  constructor() {}
  ngOnChanges() {
    console.log(
      this.bookDetails,
      this.bookDetails?.chapter?.chapterLength,
      'paginator'
    );
    this.collection = [
      ...Array(this.bookDetails?.chapter?.chapterLength).keys(),
    ].map((i) => i + 1);
  }
}

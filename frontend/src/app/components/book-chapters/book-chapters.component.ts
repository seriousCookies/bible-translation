import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { FetchdataService } from '../../service/fetchdata.service';

@Component({
  selector: 'app-book-chapters',
  templateUrl: './book-chapters.component.html',
  styleUrls: ['./book-chapters.component.scss'],
})
export class BookChaptersComponent implements OnInit {
  @Input() bookName?: string;
  @Output() selectedChapter: EventEmitter<any> = new EventEmitter();
  sendChapterUp(e: any, chapter: number, chapterList: Array<number>) {
    let sendUp = {
      chapter: chapter,
      chapterLength: chapterList.length,
    };
    this.selectedChapter.emit(sendUp);
  }
  chapterList: Array<number>;
  data$: any;

  constructor(private FetchdataService: FetchdataService) {
    this.chapterList = [-1];
  }

  ngOnInit() {
    let book = this.bookName?.toLocaleLowerCase().replace(/\s/, '-');
    this.FetchdataService.sendGetRequest(`booklist/?book=${book}`).subscribe(
      (data) => {
        this.data$ = Object.values(data);
        this.chapterList = [...Array(this.data$[0]).keys()].map((x) => ++x);
      }
    );
  }
}

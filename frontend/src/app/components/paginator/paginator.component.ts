import { Component, OnInit, Input } from '@angular/core';
import { FetchdataService } from '../../service/fetchdata.service';
import { BookDets } from '../../interfaces/Book';
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() bookDetails?: BookDets;

  collection: number[] = [];
  p: any;
  constructor() {}
  ngOnInit() {
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

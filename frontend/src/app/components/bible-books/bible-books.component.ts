import { Component, OnInit } from '@angular/core';
import { FetchdataService } from '../../service/fetchdata.service';
import { BookDets } from '../../interfaces/Book';

@Component({
  selector: 'app-bible-books',
  templateUrl: './bible-books.component.html',
  styleUrls: ['./bible-books.component.scss'],
})
export class BibleBooksComponent implements OnInit {
  public books$?: any;
  bookDetails?: BookDets;

  constructor(private FetchdataService: FetchdataService) {}
  default = {
    bookNameEN: 'genesis',
    bookNameCH: 'chuangshiji',
    chapter: 1,
  };

  getDetails(bookEN: string, bookCH: string, chapter: number) {
    this.bookDetails = {
      bookNameEN: bookEN,
      bookNameCH: bookCH,
      chapter: chapter,
    };
  }

  ngOnInit() {
    this.FetchdataService.data$.subscribe((data) => (this.books$ = data));
  }
}

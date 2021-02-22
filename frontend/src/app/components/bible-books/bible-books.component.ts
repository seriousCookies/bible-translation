import {  Component, OnInit } from '@angular/core';
import { FetchdataService } from '../../service/fetchdata.service';

interface Book {
  chinese: string;
  pinyin: string;
  english: string;
  overallOrder: string;
  testament: string;
  isCollapsed: boolean;
};

@Component({
  selector: 'app-bible-books',
  templateUrl: './bible-books.component.html',
  styleUrls: ['./bible-books.component.scss']
})

export class BibleBooksComponent implements OnInit {
  public books$: any;
  isCollapsed: boolean= true;


  constructor(private FetchdataService: FetchdataService) {}

  ngOnInit(){
   this.books$=this.FetchdataService.sendGetRequest('booklist')
  }
  public open(event:MouseEvent, book:Book) {
    book.isCollapsed=!book.isCollapsed;
  }
}

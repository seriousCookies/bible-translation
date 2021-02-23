import {  Component, OnInit } from '@angular/core';
import { FetchdataService } from '../../service/fetchdata.service';
import {BookDets} from "../../interfaces/Book";

@Component({
  selector: 'app-bible-books',
  templateUrl: './bible-books.component.html',
  styleUrls: ['./bible-books.component.scss']
})

export class BibleBooksComponent implements OnInit {
  public books$?: any;
  bookDetails?: BookDets;

  constructor(private FetchdataService: FetchdataService) {}
  bookDets = {
  bookName: "john",
  chapter:1
}
  getDetails(book:string,chapter:number) {
    this.bookDetails= {
      bookName:book,
      chapter:chapter
    };
  }
  ngOnInit(){
   this.FetchdataService.sendGetRequest('booklist').subscribe(data=>
    this.books$=data)
  }

}
 
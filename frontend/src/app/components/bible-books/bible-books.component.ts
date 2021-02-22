import { Directive, HostListener, Component, OnInit } from '@angular/core';
import { FetchdataService } from '../../service/fetchdata.service';


@Component({
  selector: 'app-bible-books',
  templateUrl: './bible-books.component.html',
  styleUrls: ['./bible-books.component.scss']
})

export class BibleBooksComponent implements OnInit {
  books$: any;
  isCollapsed: boolean= true;

  constructor(private FetchdataService: FetchdataService) {}

  @HostListener('click', ['$event.target.id']) onClick(bookID: string) {
    console.log(`You clicked on ${bookID}`);
  } 
  ngOnInit(){
   this.books$=this.FetchdataService.sendGetRequest('booklist')


  }

}

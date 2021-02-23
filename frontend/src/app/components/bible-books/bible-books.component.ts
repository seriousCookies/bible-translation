import {  Component, OnInit } from '@angular/core';
import { FetchdataService } from '../../service/fetchdata.service';


@Component({
  selector: 'app-bible-books',
  templateUrl: './bible-books.component.html',
  styleUrls: ['./bible-books.component.scss']
})

export class BibleBooksComponent implements OnInit {
  public books$?: any;


  constructor(private FetchdataService: FetchdataService) {}

  ngOnInit(){
   this.FetchdataService.sendGetRequest('booklist').subscribe(data=>
    this.books$=data)
  }

}
 
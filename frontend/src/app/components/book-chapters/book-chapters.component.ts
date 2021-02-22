import { Component, OnInit } from '@angular/core';
import { FetchdataService } from '../../service/fetchdata.service';


@Component({
  selector: 'app-book-chapters',
  templateUrl: './book-chapters.component.html',
  styleUrls: ['./book-chapters.component.scss']
})
export class BookChaptersComponent implements OnInit {
  data$: any;
  
  constructor(private FetchdataService: FetchdataService) {}

  ngOnInit(){
   this.FetchdataService.sendGetRequest('booklist/?book=psalm').subscribe(data=>{
     this.data$ = data;
   })
   
  }
}

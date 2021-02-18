import { Component, OnInit } from '@angular/core';
import { FetchdataService } from './service/fetchdata.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  books$: any;
  
  title = 'Bible-Translation';

  constructor(private FetchdataService: FetchdataService) {}

  ngOnInit(){
   this.books$=this.FetchdataService.sendGetRequest()
  //  .subscribe((data)=>{
  //    console.log(data);
  //    this.books$=data;
  //  }, (error:any)=> <any>console.log("error with fetch:",error)
  //  )
  }
}

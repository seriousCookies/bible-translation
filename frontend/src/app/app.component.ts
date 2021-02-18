import { Component, OnInit } from '@angular/core';
import { FetchdataService } from './service/fetchdata.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  posts:any;
  
  title = 'Bible-Translation';


  constructor(private FetchdataService: FetchdataService) {}

  ngOnInit(){
    this.FetchdataService.sendGetRequest().subscribe((data)=>{
      console.log(data, "here now ");
      this.posts=data;
    })
  }
}

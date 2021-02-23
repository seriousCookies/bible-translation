import { Component, Input, OnInit } from '@angular/core';
import { FetchdataService } from '../../service/fetchdata.service';

interface BookDets {
  bookName: string,
  chapter: number,
}

@Component({
  selector: 'app-chapter-verses',
  templateUrl: './chapter-verses.component.html',
  styleUrls: ['./chapter-verses.component.scss']
})
export class ChapterVersesComponent implements OnInit {
  @Input() bookDetails?:BookDets;

  constructor(private FetchdataService: FetchdataService) { }

  ngOnInit(): void{
  //   const {bookName, chapter}= this.bookDetails
  //  this.FetchdataService.sendGetRequest(`search/?book=${bookName}&chapter=${chapter}&translation=en`).subscribe(data=>{
  //   console.log(this.bookDetails, data)
  
  // })
}
}

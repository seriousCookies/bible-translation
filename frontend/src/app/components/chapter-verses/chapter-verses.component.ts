import { Component, Input, OnInit } from '@angular/core';
import { FetchdataService } from '../../service/fetchdata.service';

interface BookDets {
  bookName: String,
  chapter: Number,
}

@Component({
  selector: 'app-chapter-verses',
  templateUrl: './chapter-verses.component.html',
  styleUrls: ['./chapter-verses.component.scss']
})
export class ChapterVersesComponent implements OnInit {
  @Input() bookDetails?:BookDets;
  searchString?:string
  verseList?:Array<object>
  constructor(private FetchdataService: FetchdataService) { }

  ngOnInit(): void{
    this.searchString= `search/?book=${this.bookDetails?.bookName}&chapter=${this.bookDetails?.chapter}&translation=en`
     this.FetchdataService.sendGetRequest(this.searchString).subscribe(data=>{
       this.verseList=data;
    })
}
}

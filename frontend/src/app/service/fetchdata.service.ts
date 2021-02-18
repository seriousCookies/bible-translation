import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchdataService {

  private REST_API_SERVER="http://localhost:3001/api/booklist"

  constructor(private http: HttpClient) { }
      public sendGetRequest():Observable<Object> {
        console.log("this logs right?",this.http.get(this.REST_API_SERVER))
        return this.http.get(this.REST_API_SERVER);
    }

}

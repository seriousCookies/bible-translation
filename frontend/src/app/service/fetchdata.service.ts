import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchdataService {

  private REST_API_SERVER="http://localhost:3001/api/"

  constructor(private http: HttpClient) { }
      public sendGetRequest(path:string):Observable<Object> {
        return this.http.get(this.REST_API_SERVER+path);
    }

}

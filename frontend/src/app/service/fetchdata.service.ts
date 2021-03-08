import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { Book } from '../interfaces/Book';

@Injectable({
  providedIn: 'root',
})
export class FetchdataService {
  private REST_API_SERVER = 'mongodb://mongo-db:27017/api/';
  data$: Observable<Book[]>;
  myData: any;

  constructor(private http: HttpClient) {
    this.data$ = http.get(`${this.REST_API_SERVER}booklist`).pipe(
      tap(console.log),
      shareReplay(1),
      tap(() => console.log('after sharing'))
    );
  }

  public sendGetRequest(path: string): Observable<Book[]> {
    return this.http.get<Book[]>(this.REST_API_SERVER + path);
  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  apiURL = "https://www.googleapis.com/books/v1/volumes";
  bookStream$ = new Subject();
  totalItemsStream$ = new Subject();

  constructor(private http: Http) { }

  getTotalItemsStream() {
    return this.totalItemsStream$.asObservable().startWith(0);
  }

  getBookStream() {
    return this.bookStream$.asObservable().startWith([]);
  }

  getBooks(query = "Cervantes", startIndex = 0, maxResults = 10) {
    console.log(query)
    this.http.get(this.apiURL, {
      params: {
        q: query,
        startIndex,
        maxResults
      }
    }).map( resp => resp.json() )
      .subscribe( data => {
        this.totalItemsStream$.next(data.totalItems);
        this.bookStream$.next(data.items);
      })
  }
}
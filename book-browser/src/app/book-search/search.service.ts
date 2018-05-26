import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  apiURL = "https://www.googleapis.com/books/v1/volumes";
  bookStream$: Subject<any[]>;
  totalItemsStream$: Subject<number>;

  constructor(private http: Http) {

    this.bookStream$ = new Subject();
    this.totalItemsStream$ = new Subject();
  }

  getTotalItemsStream() {
    return this.totalItemsStream$.asObservable().startWith(0);
  }

  getBookStream() {
    return this.bookStream$.asObservable().startWith([]);
  }

  getBooks(queryParams) {

    return this.http.get(this.apiURL, { params: { ...queryParams } })
      .map( resp => resp.json() )
      .subscribe( data => {
        this.bookStream$.next(data.items);
        this.totalItemsStream$.next(data.totalItems);
      });
  }
}
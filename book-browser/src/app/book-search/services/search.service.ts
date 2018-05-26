import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  apiURL = "https://www.googleapis.com/books/v1/volumes";
  searchQuery$: BehaviorSubject<string>;
  books$: BehaviorSubject<any[]>;
  displayedPages$: BehaviorSubject<number[]>;
  currentPage$: BehaviorSubject<number>;

  constructor(private http: Http) {
    this.searchQuery$ = new BehaviorSubject(null);
    this.books$ = new BehaviorSubject([]);
    this.displayedPages$ = new BehaviorSubject([]);
    this.currentPage$ = new BehaviorSubject(null);
  }

  getSearchQueryStream() {
    return this.searchQuery$.asObservable();
  }
  getBookStream() {
    return this.books$.asObservable();
  }
  getDisplayedPagesStream() {
    return this.displayedPages$.asObservable();
  }
  getCurrentPagesStream() {
    return this.currentPage$.asObservable();
  }

  getDisplayedPages(currentPage, totalPages) {
    return Array(9)
              .fill(null)
              .map( (_, i) => {

                switch(true) {

                  case currentPage <= 5:
                    return i + 1;
                  case currentPage >= totalPages - 5:
                    return totalPages - 8 + i;
                  default:
                    return currentPage + i 
                }
              })
  }

  verifyCurrentPage(pageVal, total) {
    return pageVal > total ? total
                           : pageVal < 1 ? 1
                                         : pageVal;
  }

  updateStreams(data, q, maxResults, pageVal) {

    let books = data.items,
        totalPages = Math.ceil( data.totalItems / maxResults),
        currentPage = this.verifyCurrentPage(pageVal, totalPages),
        displayedPages = this.getDisplayedPages(currentPage, totalPages);


    this.searchQuery$.next(q);
    this.books$.next(data.items);
    this.displayedPages$.next(displayedPages);
    this.currentPage$.next(currentPage);
  }

  handleQueryChange(params) {

    let {q, maxResults = 10, page: startIndex = 1} = params;

    this.http.get(this.apiURL, { params: {
        q,
        maxResults,
        startIndex
      } })
      .map( resp => resp.json() )
      .subscribe( data => this.updateStreams(data,  q, maxResults, startIndex) )
  }
}
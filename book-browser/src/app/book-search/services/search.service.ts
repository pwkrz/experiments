import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  apiURL = "https://www.googleapis.com/books/v1/volumes";
  searchQuery$: BehaviorSubject<string>;
  books$: BehaviorSubject<any[]>;
  paginationSet$: BehaviorSubject<number[]>;
  currentPage$: BehaviorSubject<number>;
  hasError: boolean;

  constructor(private http: Http, private router: Router) {
    this.searchQuery$ = new BehaviorSubject(null);
    this.books$ = new BehaviorSubject([]);
    this.paginationSet$ = new BehaviorSubject([]);
    this.currentPage$ = new BehaviorSubject(null);
  }

  getSearchQueryStream() {
    return this.searchQuery$.asObservable();
  }
  getBookStream() {
    return this.books$.asObservable();
  }
  getPaginationSetStream() {
    return this.paginationSet$.asObservable();
  }
  getCurrentPagesStream() {
    return this.currentPage$.asObservable();
  }

  getPaginationSet(currentPage, totalPages) {
    
    console.log("window.innerWidth", window.innerWidth)

    return Array(9)
              .fill(null)
              .map( (_, i) => {

                switch(true) {
                  case currentPage <= 5:
                    return i + 1;
                  case currentPage >= totalPages - 5:
                    return totalPages - 9 + i;
                  default:
                    return currentPage - 4 + i 
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
        totalPages = Math.ceil( parseInt(data.totalItems) / parseInt(maxResults) ),
        currentPage = this.verifyCurrentPage( parseInt(pageVal), totalPages ),
        paginationSet = this.getPaginationSet(currentPage, totalPages);

    // To do: better workaround for the totalItems issue: https://productforums.google.com/forum/#!topic/books-api/Y_uEJhohJCc
    if(!data.items){
      this.hasError = true;
      console.log(new Error("Items array missing. See: https://productforums.google.com/forum/#!topic/books-api/Y_uEJhohJCc"));
      this.handleQueryChange({q, maxResults, page: pageVal - 1});
      return;
    }

    if(this.hasError) {
      this.router.navigate([], {queryParams: {page: pageVal}, queryParamsHandling: 'merge'})
      this.hasError = false;
    }

    this.searchQuery$.next(q);
    this.books$.next(data.items);
    this.paginationSet$.next(paginationSet);
    this.currentPage$.next(currentPage);
  }

  handleQueryChange(params) {

    let {q, maxResults = 10, page = 1} = params;

    this.http.get(this.apiURL, { params: {
        q,
        maxResults,
        startIndex: page*maxResults
      } })
      .map( resp => resp.json() )
      .subscribe( data => this.updateStreams(data,  q, maxResults, page), error => {throw new Error(error.status)} )
  }
}
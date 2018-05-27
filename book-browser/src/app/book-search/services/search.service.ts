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
  totalPages: number;
  currentPage: number;
  paginationSet: number[];

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

  updatePaginationSet() {
    
    let oddDigit = Math.floor(window.innerWidth / 200) * 2 - 1,
        psc = Math.max( 3, Math.min( 9, oddDigit ) ),
        halfUp = Math.ceil( psc / 2 ),
        halfDown = Math.floor( psc / 2 );

    this.paginationSet = Array(psc)
              .fill(null)
              .map( (_, i) => {

                switch(true) {
                  case this.currentPage <= halfUp:
                    return i + 1;
                  case this.currentPage >= this.totalPages - halfUp:
                    return this.totalPages - psc + i;
                  default:
                    return this.currentPage - halfDown + i 
                }

              })

    this.paginationSet$.next(this.paginationSet);
  }

  verifyCurrentPage(pageVal, total) {
    return pageVal > total ? total
                           : pageVal < 1 ? 1
                                         : pageVal;
  }

  updateStreams(data, q, maxResults, pageVal) {

    let books = data.items;

    this.totalPages = Math.ceil( parseInt(data.totalItems) / parseInt(maxResults) ),
    this.currentPage = this.verifyCurrentPage( parseInt(pageVal), this.totalPages ),
    this.updatePaginationSet();

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
    this.currentPage$.next(this.currentPage);
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
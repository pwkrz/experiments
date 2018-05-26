import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { SearchService } from './search.service';

@Component({
  selector: 'book-search',
  template: `
    <div class="book-search">
      <nav [ngClass]='{"search-bar": true, "start": !searchQuery}'>
        <search-bar [query]='searchQuery'></search-bar>
      </nav>
      <section *ngIf="searchQuery" class="search-results">
        <search-results></search-results>
        <pagination></pagination>
      </section>
    </div>
  `,
  styles: [`
    .search-bar.start {
      padding-top: 30vh;
    }
  `]
})
export class BookSearchComponent implements OnInit {

  searchQuery: string;
  totalItems$: Subject<number>;
  books$: Subject<object[]>;

  constructor(private activeRoute: ActivatedRoute,
              private searchService: SearchService) {
    
    this.totalItems$ = new Subject();
    this.books$ = new Subject();
  }

  handleQuery(queryParams) {

    this.searchQuery = queryParams.q;

    this.searchService.getBooks(queryParams);
  }

  ngOnInit() {
    
    this.activeRoute.queryParams.subscribe( queryParams => this.handleQuery(queryParams) );
  }

}

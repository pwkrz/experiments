import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { SearchService } from './services/search.service';

@Component({
  selector: 'book-search',
  template: `
    <div class="book-search">
      <nav [ngClass]='{"search-bar": true, "start": !searchQuery}'>
        <search-bar [query]='searchQuery'></search-bar>
      </nav>
      <section *ngIf="searchQuery" class="search-results">
        <pagination [displayedPages]="displayedPages$ | async" [currentPage]="currentPage$ | async"></pagination>
        <search-results [books]="books$ | async"></search-results>
        <pagination [displayedPages]="displayedPages$ | async" [currentPage]="currentPage$ | async"></pagination>
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
  books$: Observable<any[]>;
  displayedPages$: Observable<number[]>;
  currentPage$: Observable<number>;

  constructor(private activeRoute: ActivatedRoute,
              private searchService: SearchService) {
    
  }

  ngOnInit() {
    
    this.activeRoute.queryParams.subscribe( queryParams => this.searchService.handleQueryChange(queryParams) );

    this.books$ = this.searchService.getBookStream();
    this.displayedPages$ = this.searchService.getDisplayedPagesStream();
    this.currentPage$ = this.searchService.getCurrentPagesStream();

    this.searchService.getSearchQueryStream().subscribe( q => this.searchQuery = q )
  }
}

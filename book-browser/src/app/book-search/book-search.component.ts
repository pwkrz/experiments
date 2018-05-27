import { Component, OnInit, OnDestroy } from '@angular/core';
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
        <pagination [paginationSet]="paginationSet$ | async" [currentPage]="currentPage$ | async"></pagination>
        <search-results [books]="books$ | async"></search-results>
        <pagination [paginationSet]="paginationSet$ | async" [currentPage]="currentPage$ | async"></pagination>
      </section>
    </div>
  `,
  styles: [`
    :host {
      width: 100%;
    }
    .book-search {
      width: calc(100% - 20px);
      padding-left: 10px;
      padding-right: 10px;
    }
    .search-bar.start {
      padding-top: 30vh;
    }
  `]
})
export class BookSearchComponent implements OnInit, OnDestroy {

  searchQuery: string;
  books$: Observable<any[]>;
  paginationSet$: Observable<number[]>;
  currentPage$: Observable<number>;

  constructor(private activeRoute: ActivatedRoute,
              private searchService: SearchService) {
    
  }

  ngOnInit() {
    
    this.activeRoute.queryParams.subscribe( queryParams => {
      if(queryParams.q) {
        this.searchService.handleQueryChange(queryParams)    
      } else {
        this.searchQuery = '';
      }
    });

    this.books$ = this.searchService.getBookStream();
    this.paginationSet$ = this.searchService.getPaginationSetStream();
    this.currentPage$ = this.searchService.getCurrentPagesStream();

    this.searchService.getSearchQueryStream().subscribe( q => this.searchQuery = q )
  }

  ngOnDestroy() {
    this.books$ = null;
    this.paginationSet$ = null;
    this.currentPage$ = null;
  }
}

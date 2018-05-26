import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routerModule } from './book-search.routing';

import { BookSearchComponent } from './book-search.component';
import { SearchBarComponent } from './components/search-bar.component';
import { SearchResultsComponent } from './components/search-results.component';

import { SearchService } from './search.service';
import { PaginationComponent } from './components/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    routerModule
  ],
  exports: [
    BookSearchComponent
  ],
  declarations: [
    BookSearchComponent,
    SearchBarComponent,
    SearchResultsComponent,
    PaginationComponent
  ],
  providers: [
    SearchService
  ]
})
export class BookSearchModule { }

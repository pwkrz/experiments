import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { BookSearchComponent } from './book-search.component';
import { SearchBarComponent } from './components/search-bar.component';
import { SearchResultsComponent } from './components/search-results.component';

import { SearchService } from './services/search.service';
import { PaginationComponent } from './components/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule
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

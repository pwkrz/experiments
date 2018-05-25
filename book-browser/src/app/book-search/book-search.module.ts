import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routerModule } from './book-search.routing';

import { BookSearchComponent } from './book-search.component';
import { SearchBarComponent } from './search-bar.component';
import { SearchResultsComponent } from './search-results.component';

import { SearchService } from './search.service';

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
    SearchResultsComponent
  ],
  providers: [
    SearchService
  ]
})
export class BookSearchModule { }

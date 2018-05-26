import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BookSearchModule } from './book-search/book-search.module';
import { routerModule } from './app.routing';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BookSearchModule,
    routerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

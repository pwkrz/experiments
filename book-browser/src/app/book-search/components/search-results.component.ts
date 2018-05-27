import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SearchService } from './../services/search.service';

@Component({
  selector: 'search-results',
  template: `
    <article #bookCard *ngFor='let book of books' class="book-card">
      <img class="thumbnail"
            [src]='book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "http://via.placeholder.com/128x192"'
            [alt]='book.volumeInfo.title'
            (load)='onLoadStyles(bookCard)'>
      <h3 class="book-title">{{ book.volumeInfo.title }}</h3>
      <p *ngIf="book.volumeInfo.authors" class="book-author">- {{ book.volumeInfo.authors.join(", ") }}</p>
      <p *ngIf="book.volumeInfo.description" class="book-desc">
        Summary: {{ book.volumeInfo.description.length > 300 ? book.volumeInfo.description.substr(0, 300) + "..."
                                                              : book.volumeInfo.description }}
      </p>
      <a [href]="book.volumeInfo.infoLink" target="_blank">More info...</a>
    </article>
  `,
  styleUrls: ["./search-results.component.css"]
})
export class SearchResultsComponent implements OnInit, OnChanges {

  loadCounter: number = 1;

  @Input()
  books: any[];

  constructor(private searchService: SearchService) { }

  onLoadStyles(bookCard) {
    bookCard.style.order = this.loadCounter++;
    bookCard.style.opacity = 1;
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.loadCounter = 1;
  }
}

import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SearchService } from './../services/search.service';

@Component({
  selector: 'search-results',
  template: `
    <article #bookCard *ngFor='let book of books' class="book-card">
      <div class="thumbnail">
        <img [src]='book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "http://via.placeholder.com/128x192"'
             [alt]='book.volumeInfo.title'
             (load)='onLoadStyles(bookCard)'>
      </div>
      <div class="book-info">
        <div>
          <h3 class="book-title">{{ book.volumeInfo.title }}</h3>
          <p *ngIf="book.volumeInfo.authors" class="book-author">- {{ book.volumeInfo.authors.join(", ") }}</p>
          <p *ngIf="book.volumeInfo.description" class="book-desc">
            Summary: {{ book.volumeInfo.description.length > 300 ? book.volumeInfo.description.substr(0, 300) + "..."
                                                                 : book.volumeInfo.description }}
          </p>
        </div>
        <a [href]="book.volumeInfo.infoLink" target="_blank">More info...</a>
      </div> 
    </article>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
    }
    .book-card {
      display: flex;
      border: 1px solid #aaa;
      margin-bottom: 1em;
      padding: 1em;
      box-shadow: 0 2px 6px #666;
      opacity: 0;
      transition: opacity .1s linear;
    }
    .thumbnail {
      margin-right: 2em;
    }
    .book-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .book-title {
      margin: 0 !important;
    }
    .book-desc {
      color: #888;
    }
  `]
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

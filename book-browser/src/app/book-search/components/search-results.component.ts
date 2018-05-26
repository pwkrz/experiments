import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from './../services/search.service';

@Component({
  selector: 'search-results',
  template: `
    <article *ngFor='let book of books' class="book-card">
      <div class="thumbnail">
        <img *ngIf="book.volumeInfo.imageLinks" [src]='book.volumeInfo.imageLinks.thumbnail'
            [alt]='book.volumeInfo.title'>
        <img *ngIf="!book.volumeInfo.imageLinks" [src]='"http://via.placeholder.com/128x192"'
            [alt]='book.volumeInfo.title'>
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
    .book-card {
      display: flex;
      border: 1px solid #aaa;
      margin-bottom: 1em;
      padding: 1em;
      box-shadow: 0 2px 6px #666;
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
export class SearchResultsComponent implements OnInit {

  @Input()
  books: any[];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }
}

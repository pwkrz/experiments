import { Component, OnInit } from '@angular/core';

import { SearchService } from './search.service';

@Component({
  selector: 'search-bar',
  template: `
    <form (ngSubmit)="search(query)">
      <input [(ngModel)]="query" type="search" name="query" placeholder="search books..." />
      <button type="submit">Search</button>
    </form>
  `,
  styleUrls: ["./search-bar.component.css"]
})
export class SearchBarComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  search(query) {
    this.searchService.getBooks(query)
  }

  ngOnInit() {
  }

}

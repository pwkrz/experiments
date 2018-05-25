import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'book-search',
  template: `
    <search-bar [hasParams]="hasParams"></search-bar>
    <search-results *ngIf="hasParams"></search-results>
  `,
  styles: []
})
export class BookSearchComponent implements OnInit {

  hasParams: boolean;

  constructor(private activeRoute: ActivatedRoute) {

    this.activeRoute.queryParams.subscribe( query => {

      let queryLength  = Object.keys(query).length;

      this.hasParams = Boolean( queryLength );
    })
  }

  ngOnInit() {
  }

}

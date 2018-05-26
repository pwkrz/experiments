import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  @Input()
  query;

  constructor(private router: Router) { }

  search(query) {
    this.router.navigate([], {queryParams: {q: query}, queryParamsHandling: 'merge'})
  }

  ngOnInit() {
  }

}

import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'pagination',
  template: `
    <nav class="pagination">
      <a [class.disabled]="this.currentPage == 1"
         [routerLink]="[]"
         queryParamsHandling="merge"
         [queryParams]='{ page: this.currentPage - 1 }'>\<</a>

      <a *ngFor="let item of displayedPages" 
         [routerLink]="[]"
         queryParamsHandling="merge"
         [queryParams]='{ page: item }'>{{ item }}</a>

      <a [class.disabled]="this.currentPage == this.totalPages"
         [routerLink]="[]"
         queryParamsHandling="merge"
         [queryParams]='{ page: this.currentPage + 1 }'>\></a>
    </nav>
  `,
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input()
  currentPage: number;

  @Input()
  displayedPages: number[];

  constructor() {
  }

  ngOnInit() {
    console.log(this.currentPage, this.displayedPages)
  }

  ngOnChanges(changes) {
    console.log(changes)
  }
}

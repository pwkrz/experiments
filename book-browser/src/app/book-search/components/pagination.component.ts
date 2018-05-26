import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'pagination',
  template: `
    <nav class="pagination">
      <a [ngClass]='{disabled: this.currentPage == 1, "prev-next": true}'
         [routerLink]="[]"
         queryParamsHandling="merge"
         [queryParams]='{ page: this.currentPage - 1 }'>\<</a>

      <a *ngFor="let item of displayedPages" 
         [routerLink]="[]"
         routerLinkActive='active'
         [class.pressed]='this.currentPage == item'
         queryParamsHandling="merge"
         [queryParams]='{ page: item }'>{{ item }}</a>

      <a [ngClass]='{disabled: this.currentPage == this.displayedPages.length - 1, "prev-next": true}'
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
  }

  ngOnChanges(changes) {
  }
}

import { SearchService } from './../search.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pagination',
  template: `
    <p>
      pagination works!
    </p>
  `,
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input()
  totalItems;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.getTotalItemsStream()
        .subscribe( totalItems => {
          console.log("pagin", totalItems)
        })
  }

}

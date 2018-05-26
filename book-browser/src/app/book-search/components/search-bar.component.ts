import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'search-bar',
  template: `
    <form #formRef='ngForm' (ngSubmit)="search(formRef)" [class.submitted]='formRef.submitted'>
      <input #queryRef='ngModel' [(ngModel)]='query' type="search" name="query" placeholder="search books..." required minlength="2" />
      <button type="submit">Search</button>
      <small *ngIf='formRef.submitted && queryRef.errors && queryRef.errors.required'>Please enter a search term.</small>
      <small *ngIf='formRef.submitted && queryRef.errors && queryRef.errors.minlength'>
        The search term must be at least {{queryRef.errors.minlength.requiredLength}} characters long.
      </small>
    </form>
  `,
  styleUrls: ["./search-bar.component.css"]
})
export class SearchBarComponent implements OnInit {

  @Input()
  query;

  constructor(private router: Router) { }

  search(form) {
    if(form.valid) {
      this.router.navigate([], {queryParams: {q: form.value.query, page: 1}, queryParamsHandling: 'merge'})
      form.submitted = false;
    }
  }

  ngOnInit() {
  }
}

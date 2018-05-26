import { BookSearchComponent } from './book-search/book-search.component';
import { RouterModule, Routes } from '@angular/router';

// router-outlet issue: https://github.com/angular/angular/issues/19093

const routesConfig: Routes = [
  {path: '', redirectTo: 'search', pathMatch: 'full' },
  {path: '**', redirectTo: 'search', pathMatch: 'full' },
  {path: 'search', component: BookSearchComponent }
];

export const routerModule = RouterModule.forRoot(routesConfig);
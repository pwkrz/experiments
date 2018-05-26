import { BookSearchComponent } from './book-search/book-search.component';
import { RouterModule, Routes } from '@angular/router';

const routesConfig: Routes = [
  {path: '', redirectTo: 'search', pathMatch: 'full' },
  {path: '**', redirectTo: 'search', pathMatch: 'full' },
  {path: 'search', component: BookSearchComponent }
];

export const routerModule = RouterModule.forRoot(routesConfig);
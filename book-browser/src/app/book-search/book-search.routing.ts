import { RouterModule, Routes } from '@angular/router';

import { BookSearchComponent } from './book-search.component';

const routesConfig: Routes = [
  { path: 'search', component: BookSearchComponent }
];

export const routerModule = RouterModule.forChild(routesConfig);
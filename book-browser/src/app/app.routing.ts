import { RouterModule, Routes } from '@angular/router';

const routesConfig: Routes = [
  {path: '', redirectTo: 'search', pathMatch: 'full' },
  {path: '**', redirectTo: 'search', pathMatch: 'full' }
];

export const routerModule = RouterModule.forRoot(routesConfig);
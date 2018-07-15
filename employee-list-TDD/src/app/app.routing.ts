import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { RouterModule, Routes } from '@angular/router';

// router-outlet issue: https://github.com/angular/angular/issues/19093

const routesConfig: Routes = [
  {path: '', component: EmployeeListComponent },
  {path: 'edit', component: EditEmployeeComponent },
  {path: 'new', component: EditEmployeeComponent },
  {path: '**', redirectTo: '' }
];

export const routerModule = RouterModule.forRoot(routesConfig);

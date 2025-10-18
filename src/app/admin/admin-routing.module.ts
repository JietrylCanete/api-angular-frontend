import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview.component';
import { Role } from '@app/_models';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: OverviewComponent },
      {
        path: 'accounts',
        loadChildren: () =>
          import('./accounts/accounts.module').then(m => m.AccountsModule),
        data: { roles: [Role.Admin] } // ONLY ADMIN
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./employees/employees.module').then(m => m.EmployeesModule),
        data: { roles: [Role.Admin, Role.User] } // BOTH ROLES
      },
      {
        path: 'departments',
        loadChildren: () =>
          import('./departments/departments.module').then(m => m.DepartmentsModule),
        data: { roles: [Role.Admin, Role.User] } // BOTH ROLES
      },
      {
        path: 'requests',
        loadChildren: () =>
          import('./requests/requests.module').then(m => m.RequestsModule),
        data: { roles: [Role.Admin, Role.User] } // BOTH ROLES
      },
      {
        path: 'positions',
        loadChildren: () =>
          import('./positions/positions.module').then(m => m.PositionsModule),
        data: { roles: [Role.Admin, Role.User] } // BOTH ROLES
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

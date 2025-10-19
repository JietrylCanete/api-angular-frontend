import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestListComponent } from './request-list.component';
import { ManagerRequestListComponent } from './manager-request-list.component';
import { RequestAddEditComponent } from './request-add-edit.component';

const routes: Routes = [
  { path: '', component: RequestListComponent },
  { path: 'add', component: RequestAddEditComponent },
  { path: 'edit/:id', component: RequestAddEditComponent },
  { path: 'for-approval', component: ManagerRequestListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule {}

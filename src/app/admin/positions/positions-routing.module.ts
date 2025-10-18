// src/app/admin/positions/positions-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PositionListComponent } from './position-list.component';
import { PositionAddEditComponent } from './position-add-edit.component';

const routes: Routes = [
  { path: '', component: PositionListComponent },
  { path: 'add', component: PositionAddEditComponent },
  { path: 'edit/:id', component: PositionAddEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PositionsRoutingModule {}

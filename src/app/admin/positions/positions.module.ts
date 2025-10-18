// src/app/admin/positions/positions.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PositionsRoutingModule } from './positions-routing.module';

import { PositionListComponent } from './position-list.component';
import { PositionAddEditComponent } from './position-add-edit.component';

@NgModule({
  declarations: [PositionListComponent, PositionAddEditComponent],
  imports: [CommonModule, ReactiveFormsModule, PositionsRoutingModule]
})
export class PositionsModule {}

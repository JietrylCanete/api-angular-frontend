import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';       
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestAddEditComponent } from './request-add-edit.component';
import { RequestListComponent } from './request-list.component';
import { ManagerRequestListComponent } from './manager-request-list.component';

@NgModule({
  declarations: [
    RequestAddEditComponent,
    RequestListComponent,
    ManagerRequestListComponent
  ],
  imports: [
    CommonModule,            // ✅ Required for directives & pipes
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RequestsRoutingModule
  ]
})
export class RequestsModule { }

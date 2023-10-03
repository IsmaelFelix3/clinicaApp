import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmbulanceRoutingModule } from './ambulance-routing.module';
import { AmbulanceCallListComponent } from './ambulance-call-list/ambulance-call-list.component';
import { AmbulanceListComponent } from './ambulance-list/ambulance-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDialogComponent } from './ambulance-call-list/dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './ambulance-call-list/dialog/delete/delete.component';
import { FormDialogComponent as AmbulanceListForm } from './ambulance-list/dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent as AmbulanceListDelete } from './ambulance-list/dialog/delete/delete.component';
import { AmbulanceCallListService } from './ambulance-call-list/ambulance-call-list.service';
import { AmbulanceListService } from './ambulance-list/ambulance-list.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [
    AmbulanceCallListComponent,
    AmbulanceListComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    AmbulanceListForm,
    AmbulanceListDelete,
  ],
  imports: [
    CommonModule,
    AmbulanceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [AmbulanceCallListService, AmbulanceListService],
})
export class AmbulanceModule {}

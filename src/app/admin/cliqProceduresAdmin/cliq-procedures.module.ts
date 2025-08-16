import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProcedureComponent } from '../cliqProceduresAdmin/new-procedure/new-procedure.component';
import { CurrentProceduresComponent } from '../cliqProceduresAdmin/current-procedures/current-procedures.component';
import { EditProcedureComponent } from '../cliqProceduresAdmin/edit-procedure/edit-procedure.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { CliqProceduresRoutingModule } from './cliq-procedures-routing.module';
import { ComponentsModule } from '@shared/components/components.module';
import { CalendarProceduresComponent } from './calendar-procedures/calendar-procedures.component';
import { AddSuppliesComponent } from './add-supplies/add-supplies.component';
import { FormatsComponent } from './formats/formats.component';
import { AdmissionProcedureAdminComponent } from './admission-procedure-admin/admission-procedure-admin.component';
import { MassCreationProceduresComponent } from './mass-creation-procedures/mass-creation-procedures.component';
import { ItemStockListService } from '../inventory/item-stock-list/item-stock-list.service';

@NgModule({
  declarations: [
    NewProcedureComponent,
    CurrentProceduresComponent,
    EditProcedureComponent,
    CalendarProceduresComponent,
    AddSuppliesComponent,
    FormatsComponent,
    AdmissionProcedureAdminComponent,
    MassCreationProceduresComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CliqProceduresRoutingModule,
    ComponentsModule,
  ],
  providers: [ItemStockListService]
})
export class CliqProceduresModule { }

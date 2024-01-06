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

@NgModule({
  declarations: [
    NewProcedureComponent,
    CurrentProceduresComponent,
    EditProcedureComponent,
    CalendarProceduresComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CliqProceduresRoutingModule,
    ComponentsModule,
  ]
})
export class CliqProceduresModule { }

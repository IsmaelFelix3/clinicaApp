import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProcedureComponent } from './new-procedure/new-procedure.component';
import { CurrentProceduresComponent } from './current-procedures/current-procedures.component';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { CalendarProceduresComponent } from './calendar-procedures/calendar-procedures.component';
import { EditProcedureComponent } from './edit-procedure/edit-procedure.component';
import { AddSuppliesComponent } from './add-supplies/add-supplies.component';
import { FormatsComponent } from './formats/formats.component';
import { AdmissionProcedureAdminComponent } from './admission-procedure-admin/admission-procedure-admin.component';

const routes: Routes = [
  {
    path: "newProcedures",
    component: NewProcedureComponent,
  },
  {
    path: "currentProcedures",
    component: CurrentProceduresComponent,
  },
  {
    path: "calendarProcedures",
    component: CalendarProceduresComponent,
  },
  {
    path: "editProcedure",
    component: EditProcedureComponent,
  },
  {
    path: "addSupplies",
    component: AddSuppliesComponent
  },
  {
    path: "formats",
    component: FormatsComponent
  },
  {
    path: "admission",
    component: AdmissionProcedureAdminComponent
  },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CliqProceduresRoutingModule { }

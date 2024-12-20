import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { BookappointmentComponent } from './bookappointment/bookappointment.component';
import { EditappointmentComponent } from './editappointment/editappointment.component';
import { ViewappointmentComponent } from './viewappointment/viewappointment.component';
import { DeleteDialogComponent } from './viewappointment/dialogs/delete/delete.component';
import { FormDialogComponent } from './viewappointment/dialogs/form-dialog/form-dialog.component';
import { AppointmentService } from './viewappointment/appointment.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { AllAppoinmentsComponent } from './all-appoinments/all-appoinments.component';
import { AppoinmentsReportComponent } from './appoinments-report/appoinments-report.component';

@NgModule({
  declarations: [
    BookappointmentComponent,
    EditappointmentComponent,
    ViewappointmentComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    AllAppoinmentsComponent,
    AppoinmentsReportComponent,
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [AppointmentService],
})
export class AppointmentModule {}

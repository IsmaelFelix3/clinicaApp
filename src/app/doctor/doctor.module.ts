import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatIconModule } from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { FormComponent } from './appointments/form/form.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { SettingsComponent } from './settings/settings.component';
import { AppointmentsService } from './appointments/appointments.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { AppointmentComponent } from './appointments/appointment/appointment.component';
import { MedicalRecordComponent } from './patients/medical-record/medical-record.component';
import { PatientDetailsComponent } from './patients/patient-details/patient-details.component';
import { MedicalRecordsComponent } from './medical-records/medical-records.component';
import { NewAppoinmentComponent } from './appointments/new-appoinment/new-appoinment.component';
import { HistoricalAppoinmentComponent } from './appointments/historical-appoinment/historical-appoinment.component';
import { AppointmentsHistoryComponent } from './appointments/appointments-history/appointments-history.component';
import { CalendarComponent } from './appointments/calendar/calendar.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { CliqProceduresComponent } from './cliq-procedures/cliq-procedures.component';
import { CurrentProceduresComponent } from './cliq-procedures/current-procedures/current-procedures.component';
import { EditProcedureComponent } from './cliq-procedures/edit-procedure/edit-procedure.component';
import { CalendarProceduresComponent } from './cliq-procedures/calendar-procedures/calendar-procedures.component';
import { AdmissionFormComponent } from './cliq-procedures/admission-form/admission-form.component';
import { AddPatientDoctorComponent } from './patients/add-patient-doctor/add-patient-doctor.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AppointmentsComponent,
    FormComponent,
    DoctorsComponent,
    PatientsComponent,
    SettingsComponent,
    AppointmentComponent,
    MedicalRecordComponent,
    PatientDetailsComponent,
    MedicalRecordsComponent,
    NewAppoinmentComponent,
    HistoricalAppoinmentComponent,
    AppointmentsHistoryComponent,
    CalendarComponent,
    PrescriptionsComponent,
    CliqProceduresComponent,
    CurrentProceduresComponent,
    EditProcedureComponent,
    CalendarProceduresComponent,
    AdmissionFormComponent,
    MedicalRecordComponent,
    AddPatientDoctorComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    NgChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MatIconModule,
    NgApexchartsModule,
    NgScrollbarModule,
    DragDropModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [AppointmentsService],
})
export class DoctorModule {}

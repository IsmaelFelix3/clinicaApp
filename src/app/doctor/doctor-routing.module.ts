import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { SettingsComponent } from './settings/settings.component';
import { AppointmentComponent } from './appointments/appointment/appointment.component';
import { MedicalRecordsComponent } from "../doctor/medical-records/medical-records.component";
import { NewAppoinmentComponent } from './appointments/new-appoinment/new-appoinment.component';
import { CalendarComponent } from './appointments/calendar/calendar.component';
import { CliqProceduresComponent } from './cliq-procedures/cliq-procedures.component';
import { CurrentProceduresComponent } from './cliq-procedures/current-procedures/current-procedures.component';
import { EditProcedureComponent } from './cliq-procedures/edit-procedure/edit-procedure.component';
import { CalendarProceduresComponent } from './cliq-procedures/calendar-procedures/calendar-procedures.component';
import { MedicalRecordComponent } from './patients/medical-record/medical-record.component';
import { AddPatientDoctorComponent } from './patients/add-patient-doctor/add-patient-doctor.component';
import { CreateBillComponent } from './billing/create-bill/create-bill.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
  },
  {
    path: 'patients',
    component: PatientsComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'appointments',
    component: AppointmentsComponent
  },
  {
    path: 'appointment',
    component: AppointmentComponent
  },
  {
    path: 'medicalRecords',
    component: MedicalRecordsComponent
  },
  {
    path: 'medicalRecord',
    component: MedicalRecordComponent
  },
  {
    path: 'newAppointment',
    component: NewAppoinmentComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  // {
  //   path: 'cliqProcedures',
  //   component: CliqProceduresComponent
  // },
  {
    path: 'currentProcedures',
    component: CurrentProceduresComponent
  },
  // {
  //   path: 'editProcedure',
  //   component: EditProcedureComponent
  // },
  {
    path: 'calendarProcedures',
    component: CalendarProceduresComponent
  },
  {
    path: 'addPatientDoc',
    component: AddPatientDoctorComponent
  },
  {
    path: 'createBill',
    component: CreateBillComponent
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}

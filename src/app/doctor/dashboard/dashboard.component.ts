/* eslint-disable @typescript-eslint/no-empty-function */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';
import { AuthService } from '../../core/service/auth.service';
import { PatientsService } from '../patients.service';
import { AppointmentsService } from '../appointments/appointments.service';
import { CliqProceduresService } from 'app/services/cliq-procedures.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[DoctorsService, AuthService, PatientsService, AppointmentsService]
})
export class DashboardComponent implements OnInit {

  numPacientes: number = 0;
  numCitasDia: number = 0;
  numCitasMes: number = 0;
  numProcedimientosDia: number = 0;
  numProcedimientosMes: number = 0;
  idMedico: number = 0;

  constructor(public doctorService: DoctorsService, public authService: AuthService, 
              public patientService: PatientsService, public appointmentsService: AppointmentsService,
              public cliqProceduresService: CliqProceduresService){}

  ngOnInit() {
    const userLogin = JSON.parse(localStorage.getItem('currentUser')!);
    console.log(userLogin)
    const correoMedico = userLogin.correo;
    const date = new Date();
    const day = new Date(date.getFullYear(), date.getMonth(), date.getDate(),0); 
    this.doctorService.getDoctorByEmail(correoMedico).subscribe( doctor => {
      this.idMedico = doctor.medico.id_medico;
      this.patientService.getAllPatients(this.idMedico).subscribe( pacientes => {
        this.numPacientes = pacientes.numPacientes;
      });

      this.appointmentsService.getAllAppointmentss(this.idMedico).subscribe( (appoinments: any) => {
        this.numCitasDia = appoinments.numCitas;
      });

      this.appointmentsService.getAppoinmentsByMonth(this.idMedico).subscribe( appoinments => {
        this.numCitasMes = appoinments.citas;
      });
      
      this.cliqProceduresService.getProceduresCalendarDoctor(day.toISOString(),this.idMedico).subscribe( procedures => {
        this.numProcedimientosDia = procedures.procedimientos.rows.length;
      });

      this.cliqProceduresService.getProceduresMonthDoctor(this.idMedico).subscribe( procedures => {
        console.log(procedures)
        this.numProcedimientosMes = procedures.procedimientos;
      });
    });
  }

}

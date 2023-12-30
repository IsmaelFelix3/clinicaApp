/* eslint-disable @typescript-eslint/no-empty-function */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';
import { AuthService } from '../../core/service/auth.service';
import { PatientsService } from '../patients.service';
import { AppointmentsService } from '../appointments/appointments.service';


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

  constructor(public doctorService: DoctorsService, public authService: AuthService, public patientService: PatientsService, public appointmentsService: AppointmentsService) {}

  ngOnInit() {
    const correoMedico = this.authService.currentUserValue.userLogin.correo;
    this.doctorService.getDoctorByEmail(correoMedico).subscribe( doctor => {
      console.log(doctor)
      const idMedico = doctor.medico.id_medico;
      this.patientService.getAllPatients(idMedico).subscribe( pacientes => {
        this.numPacientes = pacientes.numPacientes;
      });

      this.appointmentsService.getAllAppointmentss(idMedico).subscribe( (appoinments: any) => {
        this.numCitasDia = appoinments.numCitas;
      });

      this.appointmentsService.getAppoinmentsByMonth(idMedico).subscribe( appoinments => {
        this.numCitasMes = appoinments.citas;
      });
    });
  }

}

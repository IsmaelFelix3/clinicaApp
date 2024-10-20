import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AppointmentsService } from '../appointments.service';
import { History, appointmentHistory } from '../appointments.model';
import { HistoricalAppoinmentComponent } from '../historical-appoinment/historical-appoinment.component';
import { AuthService } from '../../../core/service/auth.service';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';

@Component({
  selector: 'app-appointments-history',
  templateUrl: './appointments-history.component.html',
  styleUrls: ['./appointments-history.component.scss'],
  providers: [DoctorsService]
})
export class AppointmentsHistoryComponent implements OnInit {

  citas: appointmentHistory[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, public appointmentsService: AppointmentsService, 
              public dialog: MatDialog, public authService: AuthService, private doctorService: DoctorsService){}

  ngOnInit(): void {
    console.log(this.data)
    let idPaciente = this.data.idPaciente;
    this.doctorService.getDoctorByEmail(this.authService.currentUserValue.userLogin.correo).subscribe( doctor => {
      const idMedico = doctor.medico.id_medico;
      
      this.appointmentsService.getAppointmentsHistory(idPaciente,idMedico).subscribe({
        complete: () => {
          
        },
        next: (value: History) => {
          this.citas = value.history.rows.map( element => { 
            return {
              idCita: element.id_cita,
              idPaciente: element.id_paciente,
              peso: (element.peso_paciente) ? element.peso_paciente : null,
              sintomas: (element.sintoma_principal) ? element.sintoma_principal : null,
              diagnostico: (element.diagnostico) ? element.diagnostico : null,
              tratamiento: (element.tratamiento) ? element.tratamiento : null,
              motivoConsulta: (element.motivo_consulta) ? element.motivo_consulta : null,
              fechaCita: element.fecha_cita.toString(),
              estatus: element.estatus,
              icon: element.motivo_consulta == 'Seguimiento' ? 'watch_later' : 'event_note'
            }
          });
  
          console.log(this.citas)
          
        },
        error: (err) => {
          
        }
      });
    })
  }

  closeModal(){
    this.dialog.closeAll()
  }

  visualizarCita(idCita: number){
      console.log(idCita)
      this.appointmentsService.getAppointmentById(idCita).subscribe({
        next: (cita) => {
          this.dialog.open(HistoricalAppoinmentComponent, {
            data:{
              cita,
              action: 'history'
            },
            height: '91%',
            width: '55%',
          });
          
        },
      })
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AppointmentsService } from '../appointments.service';
import { History, appointmentHistory } from '../appointments.model';
import { HistoricalAppoinmentComponent } from '../historical-appoinment/historical-appoinment.component';

@Component({
  selector: 'app-appointments-history',
  templateUrl: './appointments-history.component.html',
  styleUrls: ['./appointments-history.component.scss']
})
export class AppointmentsHistoryComponent implements OnInit {

  citas: appointmentHistory[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, public appointmentsService: AppointmentsService, public dialog: MatDialog){}

  ngOnInit(): void {
    console.log(this.data)
    let idPaciente = this.data.idPaciente;
    this.appointmentsService.getAppointmentsHistory(idPaciente).subscribe({
      complete: () => {
        
      },
      next: (value: History) => {

        console.log(value)

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
            height: '90%',
            width: '55%',
          });
          
        },
      })
  }

}

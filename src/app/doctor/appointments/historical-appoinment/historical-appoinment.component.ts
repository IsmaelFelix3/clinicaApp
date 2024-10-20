import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AppointmentsService } from '../appointments.service';
import { ConfigurationService } from 'app/services/configuration.service';

@Component({
  selector: 'app-historical-appoinment',
  templateUrl: './historical-appoinment.component.html',
  styleUrls: ['./historical-appoinment.component.scss']
})
export class HistoricalAppoinmentComponent implements OnInit {

  isEditable: boolean = false;
  isHistory: boolean = false;
  motivos: string[] = [];

  appointmentForm: FormGroup = this.fb.group({
    id_cita: [, Validators.required],
    id_medico: [, Validators.required],
    id_paciente: [, Validators.required],
    estatus: [, Validators.required],
    fecha_cita: [, Validators.required],
    motivo_consulta: [, Validators.required],
    sintoma_principal: [, Validators.required],
    peso_paciente: [, Validators.required],
    diagnostico: [, Validators.required],
    tratamiento: [, Validators.required],
    resultados_estudios_realizados: [],
    pulso: [],
    presion_arterial: [],
    temperatura: [],
    frecuencia_cardiaca: [],
    frecuencia_respiratoria: [],
    inspeccion_general: []
  });

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, 
               private appointmentsService: AppointmentsService, public dialog: MatDialog,
               private configurationService: ConfigurationService){}

  ngOnInit(): void {
    console.log(this.data)
    this.configurationService.getMotivoConsulta().subscribe( data => {
      this.motivos = data.motivoConsulta.map( element => element.motivo_consulta);
    });
    this.appointmentForm.disable();
    if(this.data.action === 'history'){
      this.isHistory = true;
      this.appointmentForm.get('id_cita')?.setValue(this.data.cita.cita.id_cita)
      this.appointmentForm.get('id_medico')?.setValue(this.data.cita.cita.id_medico)
      this.appointmentForm.get('id_paciente')?.setValue(this.data.cita.cita.id_paciente)
      this.appointmentForm.get('estatus')?.setValue(this.data.cita.cita.estatus)
      this.appointmentForm.get('fecha_cita')?.setValue(this.data.cita.cita.fecha_cita)
      this.appointmentForm.get('motivo_consulta')?.setValue(this.data.cita.cita.motivo_consulta)
      this.appointmentForm.get('sintoma_principal')?.setValue(this.data.cita.cita.sintoma_principal)
      this.appointmentForm.get('peso_paciente')?.setValue(this.data.cita.cita.peso_paciente)
      this.appointmentForm.get('diagnostico')?.setValue(this.data.cita.cita.diagnostico)
      this.appointmentForm.get('tratamiento')?.setValue(this.data.cita.cita.tratamiento)
      this.appointmentForm.get('resultados_estudios_realizados')?.setValue(this.data.cita.cita.resultados_estudios_realizados)
      this.appointmentForm.get('pulso')?.setValue(this.data.cita.cita.pulso)
      this.appointmentForm.get('presion_arterial')?.setValue(this.data.cita.cita.presion_arterial)
      this.appointmentForm.get('temperatura')?.setValue(this.data.cita.cita.temperatura)
      this.appointmentForm.get('frecuencia_cardiaca')?.setValue(this.data.cita.cita.frecuencia_cardiaca)
      this.appointmentForm.get('frecuencia_respiratoria')?.setValue(this.data.cita.cita.frecuencia_respiratoria)
      this.appointmentForm.get('inspeccion_general')?.setValue(this.data.cita.cita.inspeccion_general)
    }else{
      this.isHistory = false;
      this.appointmentForm.get('id_cita')?.setValue(this.data.lastAppointment.cita.id_cita)
      this.appointmentForm.get('id_medico')?.setValue(this.data.lastAppointment.cita.id_medico)
      this.appointmentForm.get('id_paciente')?.setValue(this.data.lastAppointment.cita.id_paciente)
      this.appointmentForm.get('estatus')?.setValue(this.data.lastAppointment.cita.estatus)
      this.appointmentForm.get('fecha_cita')?.setValue(this.data.lastAppointment.cita.fecha_cita)
      this.appointmentForm.get('motivo_consulta')?.setValue(this.data.lastAppointment.cita.motivo_consulta)
      this.appointmentForm.get('sintoma_principal')?.setValue(this.data.lastAppointment.cita.sintoma_principal)
      this.appointmentForm.get('peso_paciente')?.setValue(this.data.lastAppointment.cita.peso_paciente)
      this.appointmentForm.get('diagnostico')?.setValue(this.data.lastAppointment.cita.diagnostico)
      this.appointmentForm.get('tratamiento')?.setValue(this.data.lastAppointment.cita.tratamiento)
      this.appointmentForm.get('resultados_estudios_realizados')?.setValue(this.data.lastAppointment.cita.resultados_estudios_realizados)
      this.appointmentForm.get('pulso')?.setValue(this.data.lastAppointment.cita.pulso)
      this.appointmentForm.get('presion_arterial')?.setValue(this.data.lastAppointment.cita.presion_arterial)
      this.appointmentForm.get('temperatura')?.setValue(this.data.lastAppointment.cita.temperatura)
      this.appointmentForm.get('frecuencia_cardiaca')?.setValue(this.data.lastAppointment.cita.frecuencia_cardiaca)
      this.appointmentForm.get('frecuencia_respiratoria')?.setValue(this.data.lastAppointment.cita.frecuencia_respiratoria)
      this.appointmentForm.get('inspeccion_general')?.setValue(this.data.lastAppointment.cita.inspeccion_general)
    }
  }

  campoEsValido(campo: string){
    return this.appointmentForm.controls[campo].errors && this.appointmentForm.controls[campo].touched;
  }

  editable(){
    Swal.fire({
      title: '¿Desea editar la ultima cita?',
      showDenyButton: true,
      confirmButtonText: 'Continuar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.isEditable = true;
        this.appointmentForm.enable();
      }
    })
  }

  editAppointment(){
    if(!this.appointmentForm.valid){
      this.appointmentForm.markAllAsTouched();
      return;
    }
    if(this.data.action === 'history'){
      let idCita = this.data.cita.cita.id_cita;

      this.appointmentsService.updateAppointment(this.appointmentForm.value, idCita).subscribe({
        complete:() => { 
          Swal.fire('Guardado con exito');
          this.dialog.closeAll();
        },
        error: (err) => { Swal.fire({ icon: 'error', title: 'Error', text: `Hubo un error en el guardado, comuniquese con el administrador ${err.msg}` })}
      });
    }else{
      let idCita = this.data.lastAppointment.cita.id_cita;
      this.appointmentsService.updateAppointment(this.appointmentForm.value, idCita).subscribe({
        complete:() => { 
          Swal.fire('Guardado con exito');
          this.dialog.closeAll();
        },
        error: (err) => { Swal.fire({ icon: 'error', title: 'Error', text: `Hubo un error en el guardado, comuniquese con el administrador ${err.msg}` })}
      });
    }
  }
}

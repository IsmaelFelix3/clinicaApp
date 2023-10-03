import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentsService } from '../appointments.service';
import { Appointments } from '../appointments.model';

import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MedicalRecordComponent } from 'app/doctor/patients/medical-record/medical-record.component';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit, OnDestroy{

  // Form
  patientForm: UntypedFormGroup;
  patientDetails: Appointments = this.appointmentsService.currentAppointment;
  estatus: boolean = false;

  constructor(utfb: UntypedFormBuilder, 
              private fb: FormBuilder, public router: Router, public appointmentsService: AppointmentsService, public dialog: MatDialog,
    ) {
    this.patientForm = utfb.group({
      nombre: [],
      apellido: [],
      direccion: [],
      telefono: [],
      correo: [],
      id_expediente: [],
      id_paciente: []
    });
  }

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

  ngOnInit(): void {
    console.log(this.patientDetails)
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class. 
    if(this.appointmentsService.currentAppointment == undefined){
      this.router.navigateByUrl('doctor/appointments');
      return;
    }
    this.patientForm.get('nombre')?.setValue(this.patientDetails.Paciente.nombre);
    this.patientForm.get('apellidos')?.setValue(this.patientDetails.Paciente.apellidos);
    this.patientForm.get('direccion')?.setValue(this.patientDetails.Paciente.calle_y_numero + ' ' + this.patientDetails.Paciente.colonia);
    this.patientForm.get('telefono')?.setValue(this.patientDetails.Paciente.telefono);
    this.patientForm.get('correo')?.setValue(this.patientDetails.Paciente.correo);
    this.patientForm.get('id_expediente')?.setValue(this.patientDetails.Paciente.id_expediente);
    this.patientForm.get('id_paciente')?.setValue(this.patientDetails.Paciente.id_paciente);
    this.patientForm.disable();

    this.appointmentForm.get('id_cita')?.setValue(this.patientDetails.id_cita);
    this.appointmentForm.get('id_medico')?.setValue(this.patientDetails.id_medico);
    this.appointmentForm.get('id_paciente')?.setValue(this.patientDetails.id_paciente);
    // TODO: Cuando esta enn finalizada cehcar el texto
    if(this.patientDetails.estatus == 'Finalizada'){
      this.estatus = false;
      this.patientDetails.estatus = 'Finalizada';
    }
    else{
      this.estatus = this.patientDetails.estatus == 'En espera' ? true : false;
      this.patientDetails.estatus = 'En curso';
    }
    this.appointmentForm.get('estatus')?.setValue('En curso');
    this.appointmentForm.get('fecha_cita')?.setValue(this.patientDetails.fecha_cita);

    // Default
    this.appointmentForm.get('pulso')?.setValue('');
    this.appointmentForm.get('presion_arterial')?.setValue('');
    this.appointmentForm.get('temperatura')?.setValue('');
    this.appointmentForm.get('frecuencia_cardiaca')?.setValue('');
    this.appointmentForm.get('frecuencia_respiratoria')?.setValue('');
    this.appointmentForm.get('inspeccion_general')?.setValue('');
    this.appointmentForm.get('resultados_estudios_realizados')?.setValue('');
  }

  finalizarCita(){
    console.log(this.appointmentForm);
    let idCita = this.appointmentForm.get('id_cita')?.value;

    if(!this.appointmentForm.valid){
      this.appointmentForm.markAllAsTouched();
      return;
    }
    this.appointmentForm.get('estatus')?.setValue('Finalizada');
    this.appointmentsService.updateAppointment(this.appointmentForm.value, idCita).subscribe({
      complete:() => { Swal.fire('Guardado con exito') },
      error: () => { Swal.fire({ icon: 'error', title: 'Error', text: 'Hubo un error en el guardado, comuniquese con el administrador' })},
      next: () => { this.router.navigateByUrl('doctor/appointments') }
    })
    console.log(this.appointmentForm.value, 'Submit');
  }

  openMedicalRecord(){
    this.dialog.open(MedicalRecordComponent, {
      height: '80%',
      width: '60%',
    });
  }

  generarReceta(){

  }
  
  campoEsValido(campo: string){
    return this.appointmentForm.controls[campo].errors && this.appointmentForm.controls[campo].touched;
  }

  ngOnDestroy(): void {
    console.log('ng on destroy')
    this.appointmentsService.currentAppointment = {};
    
  }
}

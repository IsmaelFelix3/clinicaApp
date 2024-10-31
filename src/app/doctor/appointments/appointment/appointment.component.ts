import { Component, OnDestroy, OnInit, signal } from '@angular/core';
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
import { HistoricalAppoinmentComponent } from '../historical-appoinment/historical-appoinment.component';
import { AppointmentsHistoryComponent } from '../appointments-history/appointments-history.component';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { AuthService } from '../../../core/service/auth.service';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit, OnDestroy{

  idAppointment: number = 0;

  // Form
  patientForm: UntypedFormGroup;
  patientDetails: Appointments = this.appointmentsService.currentAppointment;
  estatus: boolean = false;

  constructor(utfb: UntypedFormBuilder, 
              private fb: FormBuilder, public router: Router, public appointmentsService: AppointmentsService, public dialog: MatDialog,
              public authService: AuthService, private doctorService: DoctorsService
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
    motivo_consulta: [ {value: '', disabled: true} , Validators.required],
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
    inspeccion_general: [],
    pronostico: [],
    evolucion: []
  });

  ngOnInit(): void {
    console.log(this.patientDetails)
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class. 
    if(this.appointmentsService.currentAppointment == undefined){
      this.router.navigateByUrl('doctor/appointments');
      return;
    }

    this.idAppointment = this.patientDetails.id_cita;

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

    this.appointmentForm.get('motivo_consulta')?.setValue(this.patientDetails.motivo_consulta);

    //If appointment is closed
    if(this.patientDetails.estatus === 'Finalizada'){
      this.appointmentForm.get('pulso')?.setValue(this.patientDetails.pulso != '0' ? this.patientDetails.pulso : '');
      this.appointmentForm.get('presion_arterial')?.setValue(this.patientDetails.presion_arterial != '0' ? this.patientDetails.presion_arterial : '');
      this.appointmentForm.get('temperatura')?.setValue(this.patientDetails.temperatura != '0' ? this.patientDetails.temperatura : '');
      this.appointmentForm.get('frecuencia_cardiaca')?.setValue(this.patientDetails.frecuencia_cardiaca != '0' ? this.patientDetails.frecuencia_cardiaca : '');
      this.appointmentForm.get('frecuencia_respiratoria')?.setValue(this.patientDetails.frecuencia_respiratoria != '0' ? this.patientDetails.frecuencia_respiratoria : '');
      this.appointmentForm.get('inspeccion_general')?.setValue(this.patientDetails.inspeccion_general != '0' ? this.patientDetails.inspeccion_general : '');

      this.appointmentForm.get('sintoma_principal')?.setValue(this.patientDetails.sintoma_principal != '0' ? this.patientDetails.sintoma_principal : '');
      this.appointmentForm.get('diagnostico')?.setValue(this.patientDetails.diagnostico != '0' ? this.patientDetails.diagnostico : '');
      this.appointmentForm.get('tratamiento')?.setValue(this.patientDetails.tratamiento != '0' ? this.patientDetails.tratamiento : '');
      this.appointmentForm.get('peso_paciente')?.setValue(this.patientDetails.peso_paciente != '0' ? this.patientDetails.peso_paciente : '');
      this.appointmentForm.get('evolucion')?.setValue(this.patientDetails.evolucion != '0' ? this.patientDetails.evolucion : '');
      this.appointmentForm.get('pronostico')?.setValue(this.patientDetails.pronostico != '0' ? this.patientDetails.pronostico : '');
    }
  }

  numberOnly(event: KeyboardEvent){
    const charCode = (event.code);
    if (charCode.substring(0,5) !== 'Digit' && charCode.substring(0,6) !== 'Period' ) {
      return false;
    }
    return true;
  }

  return(){
    this.router.navigateByUrl('/doctor/appointments');
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
    // this.router.navigateByUrl('doctor/medicalRecord');
    this.dialog.open(MedicalRecordComponent, {
      height: '80%',
      width: '70%',
    });
  }

  generarReceta(){
    if(!this.appointmentForm.valid){
      this.appointmentForm.markAllAsTouched();
      Swal.fire({ icon: 'info', title: 'Error al generar receta', text: 'Debe llenar todos los campos necesarios' })
      return;
    }
    const nombrePaciente = this.patientDetails.Paciente.nombre;
    const apellidosPaciente =  this.patientDetails.Paciente.apellidos;

    const peso = this.appointmentForm.get('peso_paciente')?.value;
    const fecha = this.patientDetails.fecha_cita.substring(0,10);
    const diagnostico = this.appointmentForm.get('diagnostico')?.value;;
    const tratamiento = this.appointmentForm.get('tratamiento')?.value;;

    let docDefinition: any = {
      content: []
    };

    console.log(docDefinition)

      docDefinition.content.push(
        {
	        table:{
                widths: [100,'*',100],
                heights: [100],
                headerRows: 1,
                body: [
                    [
                        {
                          image: 'data:image/jpeg;base64,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',
                		      width: 100,
                		      height: 100,
                		      opacity: 0.5
                        },
                        {
                            text: 'Informacion del doctor'
                        },
                        {
                            image: 'data:image/png;base64,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',
                            width: 100,
                		        height: 100,
                            
                        },
                       
                    ],
                    
                ]
	        },
	    },
	   {
	        table:{
                widths: ['*','*','*'],
                heights: [546],
                headerRows: 1,
                body: [
                    [
                        {
                            text: `

                            Fecha: ${fecha}
                            
                            Nombre: ${nombrePaciente} ${apellidosPaciente} 

                            Peso: ${peso} Kg.

                            Dx: ${diagnostico}

                            Receta: 
                            ${tratamiento}`, 

                            style: 'tableHeader', 
                            colSpan: 3, 
                            alignment: 'rigth'
                        }
                    ]
                ]
	        },
	        //layout: 'solidBorders'
	    },
	    {
	        table:{
                widths: [100,287,100],
                heights: [60],
                headerRows: 1,
                body: [
                    [
                        {
                          image: 'data:image/png;base64,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',
                		      width: 100,
                		      height: 97,
                		      opacity: 0.5
                        },
                        {
                            text: 'Direccion de la clinica'
                        },
                        {
                          image: 'data:image/jpeg;base64,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',
                          width: 100,
                		      height: 90,
                		      opacity: 0.5
                        }
                    ],
                    
                ]
	        },
	    }
      )
    console.log(docDefinition)
    pdfMake.createPdf(docDefinition).open();

  }

  lastAppoinment(){
    console.log(this.authService.currentUserValue)
    const idPaciente = this.patientDetails.Paciente.id_paciente;
    this.doctorService.getDoctorByEmail(this.authService.currentUserValue.userLogin.correo).subscribe( doctor => {
      const idMedico = doctor.medico.id_medico
      this.appointmentsService.getLastAppoinment(idPaciente, idMedico).subscribe( (data: any) => {
        console.log(data.cita)
        if(data.cita === undefined){
          Swal.fire({ icon: 'info', title: data.msg });
          return
        }
        console.log(data.cita.id_cita, this.idAppointment)
        let lastAppointment: any = data;
        this.dialog.open(HistoricalAppoinmentComponent, {
          data: {
            lastAppointment
          },
          height: '91%',
          width: '60%',
        });
      });
    });
  }

  history(){
    const idPaciente = this.patientDetails.Paciente.id_paciente;
    this.dialog.open(AppointmentsHistoryComponent, {
      data: {
        idPaciente
      },
      height: '90%',
      width: '55%',
    });
  }
  
  campoEsValido(campo: string){
    return this.appointmentForm.controls[campo].errors && this.appointmentForm.controls[campo].touched;
  }

  ngOnDestroy(): void {
    console.log('ng on destroy')
    this.appointmentsService.currentAppointment = {};
    console.log(this.appointmentsService.currentAppointment)
  }
}

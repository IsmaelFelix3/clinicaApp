import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from 'app/doctor/patients.service';
import { Paciente } from 'app/interfaces/Paciente.interface';
import Swal from 'sweetalert2';
import { AppointmentsService } from '../appointments.service';
import { ScheduleServiceService } from '../../../services/schedule-service.service';

import { z } from "zod";
import { ConfigurationService } from 'app/services/configuration.service';
import { AuthService } from '../../../core/service/auth.service';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-appoinment',
  templateUrl: './new-appoinment.component.html',
  styleUrls: ['./new-appoinment.component.scss'],
  providers: [DoctorsService, AuthService]
})
export class NewAppoinmentComponent implements OnInit{
  

  patients: Paciente[] = [];
  horariosLibres: any[] = [];
  idMedico: number = 0;
  motivos: string[] = [];

  newAppoinmentForm:FormGroup = this.fb.group({
    paciente: [,Validators.required],
    medico: [, Validators.required],
    fechaCita: [, Validators.required],
    horario: [,Validators.required], 
    motivoConsulta: [, Validators.required]
  });

  constructor(public fb: FormBuilder, public patientsService: PatientsService, 
              public appoinmentsService: AppointmentsService, 
              public scheduleService:ScheduleServiceService,
              public configurationService: ConfigurationService,
              public authService: AuthService,
              public doctorService: DoctorsService,
              private router: Router){
  }

  ngOnInit(): void {

    console.log(this.authService.currentUserValue)
    // const correoMedico = this.authService.currentUserValue.userLogin.correo;
    const userLogin = JSON.parse(localStorage.getItem('currentUser')!)
    const correoMedico = userLogin.correo;
    this.doctorService.getDoctorByEmail(correoMedico).subscribe( doctor => {
      this.idMedico = doctor.medico.id_medico;
      this.newAppoinmentForm.get('medico')?.setValue(this.idMedico);
      this.patientsService.getAllPatients(this.idMedico).subscribe(data => {
        this.patients = data.paciente;
      });
    });

    this.configurationService.getMotivoConsulta().subscribe( data => {
      this.motivos = data.motivoConsulta.map( element => element.motivo_consulta);
    });

  }

  saveAppoinment(){
    console.log('click')
    console.log(this.newAppoinmentForm)
    if(!this.newAppoinmentForm.valid){
      this.newAppoinmentForm.markAllAsTouched();

      return;
    }
    console.log('clickdespues')
   
    const dateSchema = z.coerce.date();
    type DateSchema = z.infer<typeof dateSchema>;

    let fecha = new Date(this.newAppoinmentForm.get('fechaCita')?.value)
    if(!dateSchema.safeParse(fecha).success){
      Swal.fire({icon: 'error',title:'Error fecha invalida'});
      return;
    }

    let newFecha = fecha.setHours(this.newAppoinmentForm.get('horario')?.value);

    let date = new Date(new Date(newFecha).toISOString());
    let userTimezoneOffset = date.getTimezoneOffset() * 60000;
    let fechaFinal = new Date(date.getTime() - userTimezoneOffset);


    console.log(fechaFinal.toISOString());
    this.newAppoinmentForm.get('fechaCita')?.setValue(fechaFinal.toISOString());
    console.log(this.newAppoinmentForm.value);

    let object = {
      fecha_cita: this.newAppoinmentForm.value.fechaCita,
      id_medico: this.idMedico,
      id_paciente: this.newAppoinmentForm.value.paciente.id_paciente,
      motivo_consulta: this.newAppoinmentForm.value.motivoConsulta
    }

    this.appoinmentsService.addAppoinment(object).subscribe({
      complete: () => {
        this.newAppoinmentForm.reset();        
        Swal.fire('Se agendo la cita con exito');
        this.router.navigateByUrl('doctor/appointments');
      },
      error: (data) => {
        console.log(data);
        Swal.fire({icon: 'error',title:'Error al registrar la cita', text: data.msg});
      },
    });
  }

  onDateChange(event: any) {
    let horarios: any = [];
    this.horariosLibres = [];
    this.scheduleService.getAllSchedule().subscribe({
      complete: () => {
        
      },
      next: (data) => {
        horarios = data;
        console.log(horarios, 'horarios')
       
        this.appoinmentsService.getTakenSlots(new Date(event.value).toISOString()).subscribe( (data: any) => {
          let takenSlotsMap: any[] = data.arrayTakenSlots.map( (element: string) => new Date(element).getUTCHours());
          let schedulesMap  = horarios.horarios.map( (element: any) => element.horario );

          schedulesMap.forEach( (element: any) => {
            for(let index = 0; index < takenSlotsMap.length; index++){
              if( element === takenSlotsMap[index] ){
                this.horariosLibres.push({value: element, name: `${ element }:00 - ${ element + 1 }:00`, isDisable: true});
                return;
              }
            }
            this.horariosLibres.push({value: element, name: `${element}:00 - ${element+1}:00`, isDisable: false});
          });
          console.log(this.horariosLibres);
        })
      }
    });
   
    // this.newAppoinmentForm.get('fechaCita')?.setValue(new Date(event.value).toISOString())
  }

  getAllAppoinmentsSlots(){

  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday and days before from being selected.
    return day !== 0 && day !== 6 && d! > new Date();
  };

  campoEsValido(campo: string){
    return this.newAppoinmentForm.controls[campo].errors && this.newAppoinmentForm.controls[campo].touched;
  }

  toggleChange(event: any) {
    const toggle = event.source;
    if (toggle && event.value.some((item: any) => item == toggle.value)) {
        toggle.buttonToggleGroup.value = [toggle.value];
    }
  }

}

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AppointmentsService } from 'app/doctor/appointments/appointments.service';
import { PatientsService } from 'app/doctor/patients.service';
import { Paciente } from 'app/interfaces/Paciente.interface';
import { ScheduleServiceService } from 'app/services/schedule-service.service';
import Swal from 'sweetalert2';
import { z } from 'zod';
import { DoctorsService } from '../../doctors/alldoctors/doctors.service';
import { Medico } from 'app/interfaces/Medico.interface';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { ConfigurationService } from 'app/services/configuration.service';
@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.scss'],
  providers: [AppointmentsService, DoctorsService]
})
export class BookappointmentComponent {
  patients: Paciente[] = [];
  medics: Medico[] = [];
  selectedMedicId: number = 0;
  horariosLibres: any[] = [];

  motivos: string[] = [];

  newAppoinmentForm:FormGroup = this.fb.group({
    paciente: [,Validators.required],
    medico: [, Validators.required],
    fechaCita: [, Validators.required],
    horario: [,Validators.required], 
    motivoConsulta: [, Validators.required]
  });

  constructor(public fb: FormBuilder, public patientsService: PatientsService, public appoinmentsService: AppointmentsService, 
              public configurationService: ConfigurationService,public scheduleService:ScheduleServiceService,  
              public doctorsService: DoctorsService, public router: Router ){}

  ngOnInit(): void {

    this.configurationService.getMotivoConsulta().subscribe( data => {
      this.motivos = data.motivoConsulta.map( element => element.motivo_consulta);
    });

    this.newAppoinmentForm.get('paciente')?.disable();
    this.doctorsService.getAllDoctorss().subscribe( data => {
      this.medics = data.medicos;
    });
    
  }

  findPatients(event: MatSelectChange){

    this.selectedMedicId = event.value;

    this.patientsService.getAllPatients(this.selectedMedicId).subscribe(data => {
      console.log(data)
      this.newAppoinmentForm.get('paciente')?.enable();
      this.patients = data.paciente;
    });

  }

  saveAppoinment(){

    if(!this.newAppoinmentForm.valid){
      this.newAppoinmentForm.markAllAsTouched();
      return;
    }
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
      id_medico: this.newAppoinmentForm.value.medico,
      id_paciente: this.newAppoinmentForm.value.paciente.id_paciente,
      motivo_consulta: this.newAppoinmentForm.value.motivoConsulta
    }

    this.appoinmentsService.addAppoinment(object).subscribe({
      complete: () => {
        this.newAppoinmentForm.reset();        
        Swal.fire('Se agendo la cita con exito');
        this.router.navigateByUrl('admin/appointment/viewAppointment');
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

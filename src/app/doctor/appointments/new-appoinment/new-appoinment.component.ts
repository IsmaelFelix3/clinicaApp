import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { PatientsService } from 'app/doctor/patients.service';
import { MyErrorStateMatcher } from 'app/forms/form-controls/form-controls.component';
import { Paciente } from 'app/interfaces/Paciente.interface';
import Swal from 'sweetalert2';
import { AppointmentsService } from '../appointments.service';
import { ScheduleServiceService } from '../../../services/schedule-service.service';


@Component({
  selector: 'app-new-appoinment',
  templateUrl: './new-appoinment.component.html',
  styleUrls: ['./new-appoinment.component.scss'],
})
export class NewAppoinmentComponent implements OnInit{
  

  patients: Paciente[] = [];
  horariosLibres: any[] = [];

  motivos = ['Consulta Medica','Seguimiento'];

  newAppoinmentForm:FormGroup = this.fb.group({
    paciente: [,Validators.required],
    medico: [1001, Validators.required],
    fechaCita: [, Validators.required],
    horario: [,Validators.required], 
    motivoConsulta: [, Validators.required]
  });

  constructor(public fb: FormBuilder, public patientsService: PatientsService, public appoinmentsService: AppointmentsService, public scheduleService:ScheduleServiceService){
  }

  ngOnInit(): void {
    this.patientsService.getAllPatients().subscribe(data => {
      this.patients = data.paciente;
    });
  }

  saveAppoinment(){

    if(!this.newAppoinmentForm.valid){
      this.newAppoinmentForm.markAllAsTouched();
      return;
    }


    let fecha = new Date(this.newAppoinmentForm.get('fechaCita')?.value)
    let newFecha = fecha.setHours(this.newAppoinmentForm.get('horario')?.value);

    let date = new Date(new Date(newFecha).toISOString());
    let userTimezoneOffset = date.getTimezoneOffset() * 60000;
    let fechaFinal = new Date(date.getTime() - userTimezoneOffset);


    console.log(fechaFinal.toISOString());
    this.newAppoinmentForm.get('fechaCita')?.setValue(fechaFinal.toISOString());
    console.log(this.newAppoinmentForm.value);

    // let object = {
    //   fecha_cita: this.newAppoinmentForm.value.fechaCita,
    //   id_medico: this.newAppoinmentForm.value.medico,
    //   id_paciente: this.newAppoinmentForm.value.paciente.id_paciente,
    //   motivo_consulta: this.newAppoinmentForm.value.motivoConsulta
    // }

    // this.patientsService.addAppoinment(object).subscribe({
    //   complete: () => {
    //     this.newAppoinmentForm.reset();        
    //     Swal.fire('Se agendo la cita con exito');
    //   },
    //   error(err) {
    //     Swal.fire('Error al registrar la cita',err);
    //   },
    // });
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

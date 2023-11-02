import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AppointmentsService } from 'app/doctor/appointments/appointments.service';
import { Medico } from 'app/interfaces/Medico.interface';
import { Paciente } from 'app/interfaces/Paciente.interface';
import { ScheduleServiceService } from 'app/services/schedule-service.service';
import Swal from 'sweetalert2';
import { object, z } from 'zod';
import { PatientsService } from 'app/doctor/patients.service';
import { DoctorsService } from '../../doctors/alldoctors/doctors.service';
import { Cita } from 'app/interfaces/Cita.interface';
@Component({
  selector: 'app-editappointment',
  templateUrl: './editappointment.component.html',
  styleUrls: ['./editappointment.component.scss'],
  providers: [AppointmentsService, DoctorsService]
})
export class EditappointmentComponent implements OnInit {
  patients: Paciente[] = [];
  medics: Medico[] = [];
  idMedico: number = 0;
  idPaciente: number = 0;
  appoinmentBackup: any;
  selectedMedicId: number = 0;
  horariosLibres: any[] = [];
  motivos = ['Consulta Medica','Seguimiento'];
  state: any;
  minDate: Date = new Date();
  isDisabled = true;
  appoinmentForm: FormGroup = this.fb.group({
    cita: [,Validators.required,],
    paciente: [,Validators.required],
    medico: [, Validators.required],
    fechaCita: [, Validators.required],
    horario: [,Validators.required], 
    motivoConsulta: [, Validators.required]
  });
  constructor(private fb: FormBuilder, public router: Router, public appoinmentsService: AppointmentsService, public scheduleService: ScheduleServiceService, public patientsService: PatientsService, public doctorsService: DoctorsService) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
  }
  ngOnInit(): void {
    if(this.state == undefined){
      this.router.navigateByUrl('admin/appointment/viewAppointment');
      return;
    }
    let idCita = this.state.idCita;
    this.appoinmentsService.getAppointmentById(idCita).subscribe( data => {
      console.log(data.cita);
      this.loadData(data.cita);
    });

    const currentYear = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    this.minDate = new Date(currentYear, month, day - 1);
    console.log(this.state)
  }
  
  loadData(data: Cita){
    let appoinmentDate = new Date(data.fecha_cita);
    let userTimezoneOffset = appoinmentDate.getTimezoneOffset() * 60000;
    let dateWithoutOffset = new Date(appoinmentDate.getTime() + userTimezoneOffset);
    console.log(dateWithoutOffset.getHours(),'hora')
    let horario = dateWithoutOffset.getHours();
    
    let date = data.fecha_cita;
    this.loadTakenSlots(date);
    this.idMedico = data.id_medico;
    this.idPaciente = data.id_paciente;
    this.doctorsService.getAllDoctorss().subscribe( data => this.medics = data.medicos );
    this.patientsService.getAllPatients(this.idMedico).subscribe( data => this.patients = data.paciente );
    console.log(this.patients)
    
    this.appoinmentForm.get('cita')?.setValue(data.id_cita);
    this.appoinmentForm.get('paciente')?.setValue(this.idPaciente);
    this.appoinmentForm.get('medico')?.setValue(this.idMedico);
    this.appoinmentForm.get('fechaCita')?.setValue(data.fecha_cita);
    this.appoinmentForm.get('horario')?.setValue(horario);
    this.appoinmentForm.get('motivoConsulta')?.setValue(data.motivo_consulta);

    this.appoinmentBackup = {
      fechaCita: data.fecha_cita,
      horario,
      motivoConsulta: data.motivo_consulta
    }

  }

  editAppoinment(){
    console.log(this.appoinmentForm)
    if(!this.appoinmentForm.valid){
      this.appoinmentForm.markAllAsTouched();
      return;
    }
    if(this.appoinmentBackup.fechaCita == this.appoinmentForm.get('fechaCita')?.value && this.appoinmentBackup.horario == this.appoinmentForm.get('horario')?.value && 
       this.appoinmentBackup.motivoConsulta == this.appoinmentForm.get('motivoConsulta')?.value){
        Swal.fire('No hay cambios registrados');
        return;
    }
    const dateSchema = z.coerce.date();
    type DateSchema = z.infer<typeof dateSchema>;

    let fecha = new Date(this.appoinmentForm.get('fechaCita')?.value)
    if(!dateSchema.safeParse(fecha).success){
      Swal.fire({icon: 'error',title:'Error fecha invalida'});
      return;
    }

    let newFecha = fecha.setHours(this.appoinmentForm.get('horario')?.value);

    let date = new Date(new Date(newFecha).toISOString());
    let userTimezoneOffset = date.getTimezoneOffset() * 60000;
    let fechaFinal = new Date(date.getTime() - userTimezoneOffset);


    console.log(fechaFinal.toISOString());
    this.appoinmentForm.get('fechaCita')?.setValue(fechaFinal.toISOString());
    console.log(this.appoinmentForm.value);

    let object = {
      fecha_cita: this.appoinmentForm.value.fechaCita,
      id_medico: this.appoinmentForm.value.medico,
      id_paciente: this.appoinmentForm.value.paciente.id_paciente,
      motivo_consulta: this.appoinmentForm.value.motivoConsulta
    }

    let idCita = this.appoinmentForm.get('cita')?.value;

    this.appoinmentsService.updateAppointmentDate(object, idCita).subscribe({
      complete: () => {
        this.appoinmentForm.reset();        
        Swal.fire('Se agendo la cita con exito');
        this.router.navigateByUrl('admin/appointment/viewAppointment');
      },
      error: (data) => {
        console.log(data);
        Swal.fire({icon: 'error',title:'Error al registrar la cita', text: data.msg});
      },
    });
  }

  campoEsValido(campo: string){
    return this.appoinmentForm.controls[campo].errors && this.appoinmentForm.controls[campo].touched;
  }

  myFilter = (d: Date | null): boolean => {
      const day = (d || new Date()).getDay();
      // Prevent Saturday and Sunday and days before from being selected.
      return day !== 0 && day !== 6;
    
  };
  redirect(){
    this.router.navigateByUrl('admin/appointment/viewAppointment');
  }

  onDateChange(event: any) {

    let horarios: any = [];
    this.horariosLibres = [];
    this.scheduleService.getAllSchedule().subscribe({
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

  loadTakenSlots(date: string) {

    let horarios: any = [];
    this.horariosLibres = [];
    this.scheduleService.getAllSchedule().subscribe({
      next: (data) => {
        horarios = data;
        console.log(horarios, 'horarios')
       
        this.appoinmentsService.getTakenSlots(date).subscribe( (data: any) => {
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


}

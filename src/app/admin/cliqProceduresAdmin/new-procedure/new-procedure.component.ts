import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '@core';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';
import { PatientsService } from 'app/doctor/patients.service';
import { Medico } from 'app/interfaces/Medico.interface';
import { Paciente } from 'app/interfaces/Paciente.interface';
import { Quirofano } from 'app/interfaces/Procedimiento';
import { HorariosQuirofano } from 'app/interfaces/Quirofanos.interface';
import { CliqProceduresService } from 'app/services/cliq-procedures.service';
import { QuirofanosService } from 'app/services/quirofanos.service';
import Swal from 'sweetalert2';
import { z } from 'zod';

@Component({
  selector: 'app-new-procedure',
  templateUrl: './new-procedure.component.html',
  styleUrls: ['./new-procedure.component.scss']
})
export class NewProcedureComponent {

  
  doctors: Medico[] = [];
  patients: Paciente[] = [];
  horariosLibres: any[] = [];
  idMedico: number = 0;
  quirofanos: Quirofano[] = [];
  horariosQuirofanos: HorariosQuirofano[] = [];
  isVisible = false;

  procedureForm:FormGroup = this.fb.group({
    paciente: [,Validators.required],
    medico: [, Validators.required],
    fechaProcedimiento: [, Validators.required],
    horario: [,Validators.required], 
    quirofano: [, Validators.required]
  });

  constructor(public fb: FormBuilder,
              public patientsService: PatientsService, 
              public authService: AuthService,
              public doctorService: DoctorsService,
              public quirofanosService: QuirofanosService,
              public cliqProceduresService: CliqProceduresService){}

  ngOnInit(): void {
    this.quirofanosService.getQuirofanos().subscribe(quirofanos => {
      this.quirofanos = quirofanos.quirofanos.rows;
    });
    this.doctorService.getAllDoctorss().subscribe( doctors => {
      this.doctors = doctors.medicos;
    });
  }

  getPatients(){
    this.idMedico = this.procedureForm.value.medico;
    this.patientsService.getAllPatients(this.idMedico).subscribe( patients => {
      this.patients = patients.paciente;
    })
  }

  saveProcedure(){
    if(!this.procedureForm.valid){
      this.procedureForm.markAllAsTouched();
      return;
    }
   
    const dateSchema = z.coerce.date();
    type DateSchema = z.infer<typeof dateSchema>;

    let fecha = new Date(this.procedureForm.get('fechaProcedimiento')?.value);
    if(!dateSchema.safeParse(fecha).success){
      Swal.fire({icon: 'error',title:'Error fecha invalida'});
      return;
    }
    let horario = this.procedureForm.get('horario')?.value;
    let hora = horario.split(':')[0];
    let minutos = horario.split(':')[1];
    let newFecha = fecha.setHours(parseInt(hora));
    newFecha = fecha.setMinutes(parseInt(minutos))

    let date = new Date(new Date(newFecha).toISOString());
    let userTimezoneOffset = date.getTimezoneOffset() * 60000;
    let fechaFinal = new Date(date.getTime() - userTimezoneOffset);

    this.procedureForm.get('fechaProcedimiento')?.setValue(fechaFinal.toISOString());

    let object = {
      fecha_procedimiento: this.procedureForm.value.fechaProcedimiento,
      id_medico: this.idMedico,
      id_paciente: this.procedureForm.value.paciente.id_paciente,
      id_quirofano: this.procedureForm.value.quirofano
    }

    this.cliqProceduresService.scheduleProcedure(object).subscribe({
      complete: () => {
        this.procedureForm.reset();      
        this.isVisible = false;  
        Swal.fire('Se agendo procedimiento con exito');
      },
      error: (data) => {
        Swal.fire({icon: 'error',title:'Error al registrar procedimiento', text: data.msg});
      },
    });
  }

  cleanDate(){
    this.procedureForm.get('fechaProcedimiento')?.reset();
    this.isVisible = false;
  }

  onDateChange(event: any) {
    this.isVisible = true;
    let idQuirofano = this.procedureForm.get('quirofano')?.value;
    let date = new Date(event.value).toISOString();
    this.horariosLibres = [];

    this.quirofanosService.getHorarioQuirofano(idQuirofano).subscribe( data => {
      this.horariosQuirofanos = data.horariosQuirofanos;

      this.cliqProceduresService.getProceduresByDay(date, idQuirofano).subscribe( proceduresByDay => {
        let takenSlots = proceduresByDay.procedimientos.map( element => {
          let minutes = new Date(element.fecha_procedimiento).getUTCMinutes() == 0 ? '00' : '30';
          return { horario: new Date(element.fecha_procedimiento).getUTCHours() + ':' + minutes } 
        });
        this.horariosQuirofanos.forEach( element => {

          let horario = element.hora + ':' + element.minutos;

          for(let index = 0; index < takenSlots.length; index++) {
              console.log(horario + ' - ' + takenSlots[index].horario)

            if( horario == takenSlots[index].horario ){
              // if( idQuirofano == 1000 || idQuirofano == 1002 ){
                this.horariosLibres.push({ value: horario, name: `${element.hora}:${element.minutos}`, isDisable: true });
              // }
              // else{
              //   this.horariosLibres.push({ value: horario, name: `${element.hora}:${element.minutos} - ${parseInt(element.hora) + 1}:${element.minutos}`, isDisable: true });
              // }
              return;
            }
            // else{
              // if( idQuirofano == 1000 || idQuirofano == 1002 ){
              // }
              // else{
              //   this.horariosLibres.push({ value: horario, name: `${element.hora}:${element.minutos} - ${parseInt(element.hora) + 1}:${element.minutos}`, isDisable: false });
              // }
              // return;
            // }
          };
          this.horariosLibres.push({ value: horario, name: `${element.hora}:${element.minutos}`, isDisable: false });
        });
      });
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday and days before from being selected.
    return day !== 0 && day !== 6 && d! > new Date();
  };

  campoEsValido(campo: string){
    return this.procedureForm.controls[campo].errors && this.procedureForm.controls[campo].touched;
  }

  // toggleChange(event: any) {
  //   const toggle = event.source;
  //   if (toggle && event.value.some((item: any) => item == toggle.value)) {
  //       toggle.buttonToggleGroup.value = [toggle.value];
  //   }
  // }

}

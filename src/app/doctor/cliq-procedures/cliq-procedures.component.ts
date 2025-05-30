import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '@core';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';
import { Paciente } from 'app/interfaces/Paciente.interface';
import Swal from 'sweetalert2';
import { z } from 'zod';
import { PatientsService } from '../patients.service';
import { QuirofanosService } from 'app/services/quirofanos.service';
import { HorariosQuirofano, Quirofano,  } from 'app/interfaces/Quirofanos.interface';
import { CliqProceduresService } from '../../services/cliq-procedures.service';
import { AdmissionFormComponent } from './admission-form/admission-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ProceduresTypeService } from 'app/services/procedures-type.service';
import { TipoProcedimiento, TipoProcedimientoElement } from 'app/interfaces/TipoProcedimiento';

@Component({
  selector: 'app-cliq-procedures',
  templateUrl: './cliq-procedures.component.html',
  styleUrls: ['./cliq-procedures.component.scss']
})
export class CliqProceduresComponent {

  patients: Paciente[] = [];
  horariosLibres: any[] = [];
  idMedico: number = 0;
  quirofanos: Quirofano[] = [];
  tipoProcedimiento: TipoProcedimientoElement[] = [];
  horariosQuirofanos: HorariosQuirofano[] = [];
  isVisible = false;

  procedureForm:FormGroup = this.fb.group({
    paciente: [,Validators.required],
    medico: [, Validators.required],
    fechaProcedimiento: [, ],
    horario: [,Validators.required], 
    quirofano: [, Validators.required],
    tipoProcedimiento: [, Validators.required]
  });

  constructor(public fb: FormBuilder, public patientsService: PatientsService, 
              public authService: AuthService,
              public doctorService: DoctorsService,
              public quirofanosService: QuirofanosService,
              public cliqProceduresService: CliqProceduresService,
              public procedureType: ProceduresTypeService,
              public dialog: MatDialog, ){
  }

  ngOnInit(): void {
    this.quirofanosService.getQuirofanos().subscribe(quirofanos => {
      this.quirofanos = quirofanos.quirofanos.rows;
      console.log(quirofanos)
    });

    this.procedureType.getProcedure().subscribe( typeProcedure => {
      this.tipoProcedimiento = typeProcedure.tipoProcedimiento;
    });
    console.log(this.authService.currentUserValue)
    // const correoMedico = this.authService.currentUserValue.correo;
    const correoMedico: any = localStorage.getItem('currentUser');
    console.log(correoMedico)

    this.doctorService.getDoctorByEmail(JSON.parse(correoMedico).correo).subscribe( doctor => {
      this.idMedico = doctor.medico.id_medico;
      this.procedureForm.get('medico')?.setValue(this.idMedico);
      this.patientsService.getAllPatients(this.idMedico).subscribe(data => {
        this.patients = data.paciente;
      });
    });

  }

  download(){
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = '/assets/formats/CLIQ-FTO-0000-NOTA-DE-ADMISION.pdf';
    link.download = 'formatoAdmision.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }


  openModal(){
    this.dialog.open(AdmissionFormComponent, {
      data: {
        action: 'Formato de Admisión',
      },
      height: '85%',
      width: '80%',
    });
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
      id_quirofano: this.procedureForm.value.quirofano,
      id_tipo_procedimiento: this.procedureForm.value.tipoProcedimiento
    }

    console.log(object)

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
          let minutes = new Date(element.fecha_procedimiento_inicio).getUTCMinutes() == 0 ? '00' : '30';
          return { horario: new Date(element.fecha_procedimiento_inicio).getUTCHours() + ':' + minutes } 
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

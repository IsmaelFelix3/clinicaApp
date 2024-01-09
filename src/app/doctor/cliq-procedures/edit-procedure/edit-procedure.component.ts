import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';
import { PatientsService } from 'app/doctor/patients.service';
import { Paciente } from 'app/interfaces/Paciente.interface';
import { Quirofano, HorariosQuirofano } from 'app/interfaces/Quirofanos.interface';
import { CliqProceduresService } from 'app/services/cliq-procedures.service';
import { QuirofanosService } from 'app/services/quirofanos.service';
import Swal from 'sweetalert2';
import { z } from 'zod';

@Component({
  selector: 'app-edit-procedure',
  templateUrl: './edit-procedure.component.html',
  styleUrls: ['./edit-procedure.component.scss']
})
export class EditProcedureComponent implements OnInit {

  state: any = {};
  patients: Paciente[] = [];
  horariosLibres: any[] = [];
  idMedico: number = 0;
  quirofanos: Quirofano[] = [];
  horariosQuirofanos: HorariosQuirofano[] = [];
  isVisible = false;
  idReserva: number = 0;
  formBackup: any = {};

  procedureForm:FormGroup = this.fb.group({
    paciente: [,Validators.required],
    medico: [, Validators.required],
    fechaProcedimiento: [, Validators.required],
    horario: [,Validators.required], 
    quirofano: [, Validators.required]
  });

  constructor(public fb: FormBuilder, public patientsService: PatientsService, 
              public authService: AuthService,
              public doctorService: DoctorsService,
              public quirofanosService: QuirofanosService,
              public cliqProceduresService: CliqProceduresService,
              public router: Router){
    this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    console.log(this.state)

    let procedureDate = new Date(this.state.fecha_procedimiento);
    let userTimezoneOffset = procedureDate.getTimezoneOffset() * 60000;
    let dateWithoutOffset = new Date(procedureDate.getTime() + userTimezoneOffset);
    console.log(dateWithoutOffset.getHours(),'hora')
    let minutes = dateWithoutOffset.getMinutes() == 0 ? '00':'30';
    let horario = dateWithoutOffset.getHours() + ':' + minutes;

    this.isVisible = true;
    this.procedureForm.get('paciente')?.setValue(this.state.Paciente.id_paciente);
    this.procedureForm.get('quirofano')?.setValue(this.state.id_quirofano);
    this.procedureForm.get('fechaProcedimiento')?.setValue(this.state.fecha_procedimiento);
    this.procedureForm.get('horario')?.setValue(horario);
    this.idReserva = this.state.id_reserva

    this.formBackup = {
      paciente: this.state.Paciente.id_paciente,
      quirofano: this.state.id_quirofano,
      fechaProcedimiento: this.state.fecha_procedimiento,
      horario
    }

    let today = new Date(this.state.fecha_procedimiento)
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate(),7,0)
    this.onDateChange({ value: today });

    console.log(this.procedureForm.value)
    this.quirofanosService.getQuirofanos().subscribe(quirofanos => {
      this.quirofanos = quirofanos.quirofanos.rows;
    });
    const correoMedico = this.authService.currentUserValue.correo;
    this.doctorService.getDoctorByEmail(correoMedico).subscribe( doctor => {
      this.idMedico = doctor.medico.id_medico;
      this.procedureForm.get('medico')?.setValue(this.idMedico);
      this.patientsService.getAllPatients(this.idMedico).subscribe(data => {
        this.patients = data.paciente;
      });
    });

  }

  editProcedure(){
    console.log(this.procedureForm.value)
    console.log(this.procedureForm)
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
      id_paciente: this.procedureForm.value.paciente,
      id_quirofano: this.procedureForm.value.quirofano
    }

    console.log(horario + ' - ' + this.formBackup.horario)
    console.log(object.fecha_procedimiento +' - '+ this.formBackup.fechaProcedimiento)
    console.log(object.id_quirofano +' - '+ this.formBackup.quirofano) 
    console.log(object.id_paciente +' - '+ this.formBackup.paciente)
    if(object.fecha_procedimiento == this.formBackup.fechaProcedimiento && object.id_quirofano == this.formBackup.quirofano 
       && object.id_paciente == this.formBackup.paciente && horario == this.formBackup.horario ){
        Swal.fire('No hay cambios registrados');
        return;
    }

    this.cliqProceduresService.editProcedure(object, this.idReserva).subscribe({
      complete: () => {
        this.procedureForm.reset();      
        this.isVisible = false;  
        Swal.fire('Se agendo procedimiento con exito');
        this.router.navigateByUrl('/doctor/currentProcedures', {replaceUrl: true});
      },
      error: (data) => {
        Swal.fire({icon: 'error',title:'Error al editar procedimiento', text: data.msg});
        this.loadData();
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
    if( event == null ){
      event = {
        value: new Date()
      }
    }
    let today = event.value;
    let userTimezoneOffset = today.getTimezoneOffset() * 60000;
    let correctedDate = new Date(today.getTime() - userTimezoneOffset);
    correctedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(),0,0,0);

    let date = new Date(correctedDate).toISOString();
    
    this.horariosLibres = [];

    this.quirofanosService.getHorarioQuirofano(idQuirofano).subscribe( data => {
      this.horariosQuirofanos = data.horariosQuirofanos;
      console.log(date, idQuirofano)
      this.cliqProceduresService.getProceduresByDay(date, idQuirofano).subscribe( (proceduresByDay:any) => {
        console.log(proceduresByDay)
        let takenSlots = proceduresByDay.procedimientos.map( (element:any) => {
          let minutes = new Date(element.fecha_procedimiento).getUTCMinutes() == 0 ? '00' : '30';
          return { horario: new Date(element.fecha_procedimiento).getUTCHours() + ':' + minutes } 
        });
        this.horariosQuirofanos.forEach( element => {

          let horario = element.hora + ':' + element.minutos;

          for(let index = 0; index < takenSlots.length; index++) {
              console.log(horario + ' - ' + takenSlots[index].horario)

            if( horario == takenSlots[index].horario ){
                this.horariosLibres.push({ value: horario, name: `${element.hora}:${element.minutos}`, isDisable: true });
              return;
            }
          };
          this.horariosLibres.push({ value: horario, name: `${element.hora}:${element.minutos}`, isDisable: false });
        });
        console.log(this.horariosLibres)
      });
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday and days before from being selected.
    return day !== 0 && day !== 6;
  };

  campoEsValido(campo: string){
    return this.procedureForm.controls[campo].errors && this.procedureForm.controls[campo].touched;
  }

  deleteProcedure(){
    Swal.fire({
      title: "¿Seguro que desea eliminar el procedimiento?",
      text: "No podras revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cliqProceduresService.deleteProcedure(this.idReserva).subscribe({
          next: (value) => {
            Swal.fire({ title: 'Eliminado', text: value.msg, icon: 'success'});
            
          },
          complete: () => {
            this.procedureForm.reset();      
            this.isVisible = false;  
            this.router.navigateByUrl('/doctor/currentProcedures', {replaceUrl: true});
          },
          error: (data) => {
            Swal.fire({icon: 'error',title:'Error al editar procedimiento', text: data.msg});
            this.loadData();
          },
        })
      }
    });
    
  }
}

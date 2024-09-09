import { Direction } from '@angular/cdk/bidi';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '@core';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';
import { FormComponent } from 'app/contacts/form/form.component';
import { Appointments } from 'app/doctor/appointments/appointments.model';
import { AppointmentsService } from 'app/doctor/appointments/appointments.service';
import { CitaResponse } from 'app/interfaces/Cita.interface';
import { ProcedimientoTable } from 'app/interfaces/Procedimiento';
import { CliqProceduresService } from 'app/services/cliq-procedures.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendar-procedures',
  templateUrl: './calendar-procedures.component.html',
  styleUrls: ['./calendar-procedures.component.scss']
})
export class CalendarProceduresComponent {

  idMedico: number = 0;

  calendarForm: FormGroup = this.fb.group({
    fecha: [,Validators.required]
  })

  constructor(public fb: FormBuilder, public cliqProceduresService: CliqProceduresService, 
              public authService: AuthService, public doctorService: DoctorsService,
              public router: Router){}

  dataSource = new MatTableDataSource<ProcedimientoTable>();
  exampleDatabase?: AppointmentsService;
  datosFuente: Appointments[] = [];
  minDate: Date = new Date();
  showTable: boolean = false;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday and days before from being selected.
    return day !== 0 && day !== 6;
  
  };

  onDateChange(event: any) { 
    this.showTable = true;
    const date = new Date(event.value).toISOString();
    const correoMedico = this.authService.currentUserValue.userLogin.correo;

    this.doctorService.getDoctorByEmail(correoMedico).subscribe( doctor => {
      this.idMedico = doctor.medico.id_medico;
      this.cliqProceduresService.getProceduresCalendarDoctor(date,this.idMedico).subscribe(data => {
        console.log(data)
        this.dataSource = new MatTableDataSource(data.procedimientos.rows);
      });
    });
  }

  displayedColumns = [
    'patient',
    'quirofano',
    'dateTime',
    'typeProcedure',
    'estatus'
  ];
  dialog: any;

  campoEsValido(campo: string){
    return this.calendarForm.controls[campo].errors && this.calendarForm.controls[campo].touched;
  }

  redirect(row: ProcedimientoTable){
    Swal.fire({
      title: `¿Desea editar la reserva de quirofano?`,
      showDenyButton: true,
      confirmButtonText: 'Continuar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('doctor/editProcedure',{state: row});
      }
    })
  }

  detailsCall(row: Appointments) {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    this.dialog.open(FormComponent, {
      data: {
        appointments: row,
        action: 'details',
      },
      direction: tempDirection,
      height: '71%',
      width: '35%',
    });
  }

  getStatus(status: string){
    if(status == 'En espera' ){
      return 'mat-primary';
    }
    else if( status == 'En curso'){ 
      return 'mat-success';
    }
    else{
      return 'mat-finish';
    }
  }

}

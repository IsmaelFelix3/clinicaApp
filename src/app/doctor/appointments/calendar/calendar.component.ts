import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { Appointments } from '../appointments.model';
import { Direction } from '@angular/cdk/bidi';
import { AppointmentsService } from '../appointments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CitaResponse } from 'app/interfaces/Cita.interface';
import { AuthService } from '../../../core/service/auth.service';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DoctorsService]
})
export class CalendarComponent {

  idMedico: number = 0;

  calendarForm: FormGroup = this.fb.group({
    fecha: [,Validators.required]
  })

  constructor(public fb: FormBuilder, public appoinmentsService: AppointmentsService, public authService: AuthService,public doctorService: DoctorsService){}

  dataSource = new MatTableDataSource<CitaResponse>();
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
    console.log(this.authService.currentUserValue)
    console.log(this.authService.currentUser)

    const correoMedico = this.authService.currentUserValue.userLogin.correo;

    this.doctorService.getDoctorByEmail(correoMedico).subscribe( doctor => {
      this.idMedico = doctor.medico.id_medico;
      this.appoinmentsService.postAppoinmentsByDateAndMedic(this.idMedico,date).subscribe(data => {
        this.dataSource = new MatTableDataSource(data.citas);
      });
    });
  }

  displayedColumns = [
    'name',
    'dateTime',
    'email',
    'mobile',
    'disease',
    // 'actions',
  ];
  dialog: any;

  campoEsValido(campo: string){
    return this.calendarForm.controls[campo].errors && this.calendarForm.controls[campo].touched;
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

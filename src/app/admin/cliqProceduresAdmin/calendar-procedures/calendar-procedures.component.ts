import { Direction } from '@angular/cdk/bidi';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '@core';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';
import { FormComponent } from 'app/contacts/form/form.component';
import { Appointments } from 'app/doctor/appointments/appointments.model';
import { AppointmentsService } from 'app/doctor/appointments/appointments.service';
import { Medico } from 'app/interfaces/Medico.interface';
import { ProcedimientoTable, ProcedimientoTableAdmin } from 'app/interfaces/Procedimiento';
import { CliqProceduresService } from 'app/services/cliq-procedures.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendar-procedures',
  templateUrl: './calendar-procedures.component.html',
  styleUrls: ['./calendar-procedures.component.scss']
})
export class CalendarProceduresComponent implements OnInit {
  idMedico: number = 0;

  calendarForm: FormGroup = this.fb.group({
    fecha: [,Validators.required],
    medico: [,Validators.required]
  });

  dataSource = new MatTableDataSource<ProcedimientoTableAdmin>();
  exampleDatabase?: AppointmentsService;
  datosFuente: Appointments[] = [];
  minDate: Date = new Date();
  showTable: boolean = false;
  doctors: Medico[] = [];

  constructor(public fb: FormBuilder, public cliqProceduresService: CliqProceduresService, 
              public authService: AuthService, public doctorService: DoctorsService,
              public router: Router){}

  ngOnInit(){
    this.doctorService.getAllDoctorss().subscribe( doctors => {
      this.doctors = doctors.medicos;
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday and days before from being selected.
    return day !== 0 && day !== 6;
  
  };

  onDateChange(event: any) { 
    if(!this.calendarForm.valid){
      this.calendarForm.markAllAsTouched();
      return;
    }
      const date = new Date(event.value).toISOString();
      
      this.cliqProceduresService.getProceduresCalendarAdmin(date, this.idMedico).subscribe(data => {
        console.log(data)
        this.dataSource = new MatTableDataSource(data.procedimientos.rows);
      });
    this.showTable = true;
  }

  onDoctorChange(){
    this.idMedico = this.calendarForm.value.medico;
    this.calendarForm.get('fecha')?.reset();
    this.showTable = false;
  }

  displayedColumns = [
    'doctor',
    'patient',
    'quirofano',
    'dateTime',
  ];
  dialog: any;

  campoEsValido(campo: string){
    return this.calendarForm.controls[campo].errors && this.calendarForm.controls[campo].touched;
  }

  redirect(row: ProcedimientoTableAdmin){
    Swal.fire({
      title: `¿Desea editar la reserva de quirofano?`,
      showDenyButton: true,
      confirmButtonText: 'Continuar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('admin/cliqProcedures/editProcedure',{state: row});
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

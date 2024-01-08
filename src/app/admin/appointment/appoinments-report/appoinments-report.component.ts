import { Direction } from '@angular/cdk/bidi';
import { formatDate } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '@core';
import { TableElement, TableExportUtil } from '@shared';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';
import { FormComponent } from 'app/contacts/form/form.component';
import { Appointments } from 'app/doctor/appointments/appointments.model';
import { AppointmentsService } from 'app/doctor/appointments/appointments.service';
import { CitasReport } from 'app/interfaces/Cita.interface';
import { Medico } from 'app/interfaces/Medico.interface';
import { ProcedimientoTableAdmin } from 'app/interfaces/Procedimiento';
import { CliqProceduresService } from 'app/services/cliq-procedures.service';
import Swal from 'sweetalert2';

import localeEs from '@angular/common/locales/es-MX'

@Component({
  selector: 'app-appoinments-report',
  templateUrl: './appoinments-report.component.html',
  styleUrls: ['./appoinments-report.component.scss'],
  providers: [AppointmentsService, { provide: LOCALE_ID, useValue: 'es-MX' }]
})
export class AppoinmentsReportComponent {

  BtngenerarExcel = false;
  idMedico: number = 0;
  reportForm: FormGroup = this.fb.group({
    startDate: [,Validators.required],
    endDate: [,Validators.required],
    type: [,Validators.required],
    medico: [,Validators.required]
  });

  dataSource = new MatTableDataSource<CitasReport>();
  exampleDatabase?: AppointmentsService;
  datosFuente: CitasReport[] = [];
  minDate: Date = new Date();
  showTable: boolean = false;
  doctors: Medico[] = [];

  constructor(public fb: FormBuilder, public appoinmentsService: AppointmentsService, 
              public authService: AuthService, public doctorService: DoctorsService,
              public router: Router){}

  ngOnInit(){
    this.doctorService.getAllDoctorss().subscribe( doctors => {
      this.doctors = doctors.medicos;
    });
  }

  search(){
    if(!this.reportForm.valid){
      this.reportForm.markAllAsTouched();
      return;
    }

    const startDate = new Date(this.reportForm.value.startDate);
    const endDate = new Date(this.reportForm.value.endDate);

    if(endDate < startDate){
      console.log('entro')

    }

    console.log(this.reportForm.value )

    const object = {
      idMedico: this.reportForm.value.medico,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      type: this.reportForm.value.type
    }
      
      this.appoinmentsService.getAppoinmentsByDateAndType(object).subscribe(data => {
        if( data.citas.rows.length != 0){
          this.datosFuente = data.citas.rows;
          this.dataSource = new MatTableDataSource(this.datosFuente);
          this.showTable = true;
          this.BtngenerarExcel = true;
        }
      });
  }

  displayedColumns = [
    'name',
    'motivo_consulta',
    'fecha',
    "status"
  ];
  dialog: any;

  campoEsValido(campo: string){
    return this.reportForm.controls[campo].errors && this.reportForm.controls[campo].touched;
  }

  exportExcel(){
    // key name with space add in brackets
    console.log(this.dataSource)
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        'Nombre Paciente': x.Paciente.nombre + ' ' + x.Paciente.apellidos,
        'Motivo Consulta': x.motivo_consulta,
        // 'Fecha Consulta': formatDate(new Date(x.fecha_cita), 'yyyy-MM-dd', locale) || '',
        'Fecha Consulta': x.fecha_cita.split('T')[0] + ' - ' + x.fecha_cita.split('T')[1].substring(0,5),
        Estatus: x.estatus,
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
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

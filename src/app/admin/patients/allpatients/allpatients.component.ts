import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Patient } from './patient.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { PatientsService } from 'app/doctor/patients.service';
import { PacienteShort, PacienteTableAdmin } from 'app/interfaces/Paciente.interface'; 
import { CustomDateTablePipe } from 'app/helpers/custom-date-table.pipe';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Component({
  selector: 'app-allpatients',
  templateUrl: './allpatients.component.html',
  styleUrls: ['./allpatients.component.scss'],
})
export class AllpatientsComponent extends UnsubscribeOnDestroyAdapter implements OnInit
{
  displayedColumns = [
    'idPaciente',
    'nombre',
    'correo',
    'telefono',
    'edad',
    'fechaRegistro'
  ];
  isSpinnerActive: boolean = true;
  patients: PacienteTableAdmin[] = [];
  dataSource = new MatTableDataSource<PacienteTableAdmin>();
  selection = new SelectionModel<Patient>(true, []);
  index?: number;
  id?: number;
  patient?: Patient;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public patientService: PatientsService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;
  
  
  ngOnInit() {
    this.loadData();
  }
  
  public loadData() {
    this.patientService.getAllPatientsAdmin().subscribe({
      complete: () => {
        this.isSpinnerActive = false;
      },
      next: (data) => {
        console.log(data)
        this.patients = data.pacientes.map( element => {
          return {
            idPaciente: element.id_paciente,
            nombre: element.nombre,
            apellidos: element.apellidos,
            edad: this.calculate_age(new Date (element.fecha_nacimiento)),
            correo: element.correo,
            telefono: element.telefono,
            fechaRegistro: element.fecha_registro.toString().substring(0,10),
          }
        });
        this.dataSource = new MatTableDataSource(this.patients);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        
      },
    })

    this.subs.sink = fromEvent(this.filter?.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter?.nativeElement.value;
      }
    );
  }
  
  calculate_age(dob: Date) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  redirect(idPaciente: number){
    this.router.navigateByUrl('admin/patients/edit-patient',{state: {idPaciente}});
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
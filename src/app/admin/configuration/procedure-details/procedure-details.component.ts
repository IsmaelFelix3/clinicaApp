import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Doctors } from 'app/admin/doctors/alldoctors/doctors.model';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';
import { CatalogoProcedimientos, ProcedimientoCatalogo, ProcedimientoCatalogoTable } from 'app/interfaces/CatalogoProcedimientos';
import { MedicoTable } from 'app/interfaces/Medico.interface';
import { ProceduresCatalogService } from 'app/services/procedures-catalog.service';
import { fromEvent } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-procedure-details',
  templateUrl: './procedure-details.component.html',
  styleUrls: ['./procedure-details.component.scss']
})
export class ProcedureDetailsComponent  extends UnsubscribeOnDestroyAdapter implements OnInit {
 displayedColumns = [
    // 'select',
    'id_procedimiento',
    'nombre_procedimiento',
    'especialidad',
    'nombre_quirofano'
    // 'actions',
  ];
  exampleDatabase?: DoctorsService;
  dataSource = new MatTableDataSource<ProcedimientoCatalogoTable>();
  procedimientos: ProcedimientoCatalogoTable[] = [];
  selection = new SelectionModel<Doctors>(true, []);
  index?: number;
  id?: number;
  dataLength: number = 0;
  // doctors?: Doctors;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public procedureCatalog: ProceduresCatalogService,
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
  refresh() {
    this.loadData();
  }
  redirect(idMedico: any){
      console.log(event)
      this.router.navigateByUrl('admin/doctors/edit-doctor',{state: {id: idMedico}});
  }

  private refreshTable() {
    this.paginator?._changePageSize(this.paginator?.pageSize);
  }

  public loadData() {
    console.log('load data');
    this.procedureCatalog.getProceduresByOperatingRoom(1001).subscribe({
      complete: () => {

      },
      next: (value) => {
        console.log(value)
        this.procedimientos = value.catalogoProcedimiento.rows.map( element => {
          return {
            id_procedimiento: element.id_procedimiento,
            especialidad: element.especialidad,
            nombre_procedimiento: element.nombre_procedimiento,
            quirofano: element.quirofano,
            nombre_quirofano: element['Quirofano.nombre_quirofano']
          }
        });
        console.log(this.procedimientos)
        this.dataSource = new MatTableDataSource(this.procedimientos);
        this.dataSource.paginator = this.paginator;
        this.dataLength = this.procedimientos.length;
      },
      error: (err) => {

      },
    });
    this.subs.sink = fromEvent(this.filter?.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter?.nativeElement.value;
      }
    );
  }
}

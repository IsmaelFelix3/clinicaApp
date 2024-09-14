import { Direction } from '@angular/cdk/bidi';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '@core';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';
import { FormComponent } from 'app/contacts/form/form.component';
import { Appointments } from 'app/doctor/appointments/appointments.model';
import { AppointmentsService } from 'app/doctor/appointments/appointments.service';
import { ProcedimientoTable, ProcedimientoTableAdmin } from 'app/interfaces/Procedimiento';
import { CliqProceduresService } from 'app/services/cliq-procedures.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-current-procedures',
  templateUrl: './current-procedures.component.html',
  styleUrls: ['./current-procedures.component.scss']
})
export class CurrentProceduresComponent {

  
  filterToggle = false;
  displayedColumns = [
    // 'id',
    'doctor',
    'patient',
    'quirofano',
    'dateTime',
    'typeProcedure',
    'estatus',
    'actions'
  ];
  currentDate = new Date().toISOString();
  estatus: number = 1;
  exampleDatabase?: AppointmentsService;
  dataSource = new MatTableDataSource<ProcedimientoTableAdmin>();

  datosFuente: ProcedimientoTableAdmin[] = [];
  selection = new SelectionModel<Appointments>(true, []);
  id?: number;
  appointments?: Appointments;
  constructor(
    public dialog: MatDialog,
    public cliqProceduresService: CliqProceduresService,
    public authService: AuthService,
    public doctorService: DoctorsService,
    public router: Router
  ) {
    // super();
    dataSource: new MatTableDataSource([]);
  }
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  public loadData() {

    this.cliqProceduresService.getAllProceduresDay('Admin',new Date().toISOString()).subscribe( Procedures => {
      console.log(Procedures)
      this.datosFuente = Procedures.procedimientos.rows;
      this.dataSource = new MatTableDataSource(this.datosFuente);
    })

    // const EmailUser = this.authService.currentUserValue.correo;
    // let idMedico: number = 0;
    // console.log(EmailUser)

    // this.doctorService.getDoctorByEmail( EmailUser ).subscribe( doctor => {
    //   idMedico = doctor.medico.id_medico;
    //   console.log(idMedico)
    //   this.cliqProceduresService.getCurrentProceduresDoctor(idMedico).subscribe( data => {
    //     console.log(data,' Procedures')
    //     this.datosFuente = data.procedimientos.rows;
    //     this.dataSource = new MatTableDataSource(this.datosFuente)
  
    //     // this.datosFuente.forEach( procedimiento => {
    //     //   cita.fecha_cita = new Date(cita.fecha_cita).toLocaleString();
    //     // })
    //     console.log(this.datosFuente, 'datosFuente')
    //   });
    // });

    // const idMedico = this.authService.currentUserValue.id_medico;
    
    // this.subs.sink = fromEvent(this.filter?.nativeElement, 'keyup').subscribe(
    //   () => {
    //     if (!this.dataSource) {
    //       return;
    //     }
    //     this.dataSource.filter = this.filter?.nativeElement.value;
    //   }
    // );
  }

  admission(row: ProcedimientoTable){
    Swal.fire({
      title: `¿Desea iniciar el proceso de admisión?`,
      showDenyButton: true,
      confirmButtonText: 'Continuar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('admin/cliqProcedures/admission',{state: row});
      }
    })
  }

  redirect(row: ProcedimientoTable){
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

  addNew() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        appointments: this.appointments,
        action: 'add',
      },
      direction: tempDirection,
    });
    
  }
  detailsCall(row: ProcedimientoTable) {
    console.log(row)
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


  toggleStar(row: Appointments) {
    console.log(row);
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.renderedData.length;
  //   return numSelected === numRows;
  // }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected()
  //     ? this.selection.clear()
  //     : this.dataSource.renderedData.forEach((row) =>
  //         this.selection.select(row)
  //       );
  // }
  // removeSelectedRows() {
  //   const totalSelect = this.selection.selected.length;
  //   this.selection.selected.forEach((item) => {
  //     const index: number = this.dataSource.renderedData.findIndex(
  //       (d) => d === item
  //     );
  //     // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
  //     this.exampleDatabase?.dataChange.value.splice(index, 1);
  //     this.refreshTable();
  //     this.selection = new SelectionModel<Appointments>(true, []);
  //   });
  //  
  // }

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

  addSupplies(id: number){
    Swal.fire({
      title: `¿Desea agregar insumos al procedimiento?`,
      showDenyButton: true,
      confirmButtonText: 'Continuar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('admin/cliqProcedures/addSupplies',{ state: {id} });
      }
    })
  }
  
  // export table data in excel file
  // exportExcel() {
  //   // key name with space add in brackets
  //   const exportData: Partial<TableElement>[] =
  //     this.dataSource.filteredData.map((x) => ({
  //       'Patient Name': x.name,
  //       Email: x.email,
  //       'Date & Time':
  //         formatDate(new Date(x.dateTime), 'yyyy-MM-dd', 'en') || '',
  //       Mobile: x.mobile,
  //       Disease: x.disease,
  //     }));

  //   TableExportUtil.exportToExcel(exportData, 'excel');
  // }

}

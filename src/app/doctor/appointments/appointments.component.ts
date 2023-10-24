import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppointmentsService } from './appointments.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Appointments } from './appointments.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { FormComponent } from './form/form.component';
import { Direction } from '@angular/cdk/bidi';
import {
  TableExportUtil,
  TableElement,
  UnsubscribeOnDestroyAdapter,
} from '@shared';
import { formatDate } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  filterToggle = false;
  displayedColumns = [
    // 'select',
    // 'img',
    'name',
    'dateTime',
    'email',
    'mobile',
    'disease',
    'actions',
  ];
  currentDate = new Date().toISOString();
  estatus: number = 1;
  exampleDatabase?: AppointmentsService;
  // dataSource!: ExampleDataSource;
  // dataSource: any;
  dataSource = new MatTableDataSource<Appointments>();

  datosFuente: Appointments[] = [];
  selection = new SelectionModel<Appointments>(true, []);
  id?: number;
  appointments?: Appointments;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public appointmentsService: AppointmentsService,
    private snackBar: MatSnackBar
  ) {
    super();
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
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        this.exampleDatabase?.dataChange.value.unshift(
          this.appointmentsService.getDialogData()
        );
        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
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
  //   this.showNotification(
  //     'snackbar-danger',
  //     totalSelect + ' Record Delete Successfully...!!!',
  //     'bottom',
  //     'center'
  //   );
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
  public loadData() {

    // this.exampleDatabase = new AppointmentsService(this.httpClient);

    // this.dataSource = new ExampleDataSource(
    //   this.exampleDatabase,
    //   this.paginator,
    //   this.sort
    // );
    let idMedico = 1001
    this.appointmentsService.getAllAppointmentss(idMedico).subscribe( (data: any) => {
      this.datosFuente = data.citasActuales;
      this.dataSource = new MatTableDataSource(this.datosFuente)

      this.datosFuente.forEach( cita => {
        cita.fecha_cita = new Date(cita.fecha_cita).toLocaleString();
      })
      console.log(this.datosFuente, 'datosFuente')
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
export class ExampleDataSource extends DataSource<Appointments> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Appointments[] = [];
  renderedData: Appointments[] = [];
  constructor(
    public exampleDatabase: AppointmentsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Appointments[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    // let idMedico = 1001
    // this.exampleDatabase.getAllAppointmentss(idMedico);
    
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.exampleDatabase.dataChange.subscribe((data: any) => {
          this.filteredData = data.citas;
          this.filteredData.slice()
          .filter((appointments: Appointments) => {
            const searchStr = (
              appointments.Paciente.nombre +
              appointments.fecha_cita +
              appointments.Paciente.correo +
              appointments.Paciente.telefono +
              appointments.Paciente.calle_y_numero
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
          // Sort filtered data
          const sortedData = this.sortData(this.filteredData.slice());
          // Grab the page's slice of the filtered sorted data.
          const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
          this.renderedData = sortedData.splice(
            startIndex,
            this.paginator.pageSize
          );
        })
        // this.filteredData = this.exampleDatabase.dataChange.getValue()
        // this.filteredData.slice()
        //   .filter((appointments: Appointments) => {
        //     const searchStr = (
        //       appointments.Paciente.nombre +
        //       appointments.fecha_cita +
        //       appointments.Paciente.correo +
        //       appointments.Paciente.telefono +
        //       appointments.Paciente.calle_y_numero
        //     ).toLowerCase();
        //     return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        //   });
        // // Sort filtered data
        // const sortedData = this.sortData(this.filteredData.slice());
        // // Grab the page's slice of the filtered sorted data.
        // const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        // this.renderedData = sortedData.splice(
        //   startIndex,
        //   this.paginator.pageSize
        // );
        console.log(this.renderedData,' this.renderedData ----')
        return this.renderedData;
      })
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: Appointments[]): Appointments[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id_cita, b.id_cita];
          break;
        case 'name':
          [propertyA, propertyB] = [a.Paciente.nombre, b.Paciente.nombre];
          break;
        case 'email':
          [propertyA, propertyB] = [a.Paciente.correo, b.Paciente.correo];
          break;
        case 'dateTime':
          [propertyA, propertyB] = [a.fecha_cita, b.fecha_cita];
          break;
        case 'address':
          [propertyA, propertyB] = [a.Paciente.calle_y_numero, b.Paciente.calle_y_numero];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}

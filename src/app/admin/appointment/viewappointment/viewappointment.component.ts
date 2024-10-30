import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from './appointment.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Appointment } from './appointment.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Direction } from '@angular/cdk/bidi';
import {
  TableExportUtil,
  TableElement,
  UnsubscribeOnDestroyAdapter,
} from '@shared';
import { formatDate } from '@angular/common';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { FormComponent } from 'app/contacts/form/form.component';
import { Appointments } from 'app/doctor/appointments/appointments.model';
import { AppointmentsService } from 'app/doctor/appointments/appointments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewappointment',
  templateUrl: './viewappointment.component.html',
  styleUrls: ['./viewappointment.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, AppointmentsService],
})
export class ViewappointmentComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
 
  filterToggle = false;
  displayedColumns = [
    'name',
    'dateTime',
    'medic',
    'email',
    'mobile',
    'estatus',
    // 'actions',
  ];
  currentDate = new Date().toISOString();
  estatus: number = 1;
  exampleDatabase?: AppointmentsService;
  dataSource = new MatTableDataSource<Appointments>();

  datosFuente: Appointments[] = [];
  selection = new SelectionModel<Appointments>(true, []);
  id?: number;
  appointments?: Appointments;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public appointmentsService: AppointmentsService,
    private snackBar: MatSnackBar,
    public router: Router
  ) {
    super();
    dataSource: new MatTableDataSource([]);
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
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
    this.appointmentsService.getAllAppoinmentsAdmin().subscribe( (data: any) => {
      this.datosFuente = data.citasActuales;
      this.dataSource = new MatTableDataSource(this.datosFuente)

      this.datosFuente.forEach( cita => {
        cita.fecha_cita = new Date(cita.fecha_cita).toLocaleString();
      });
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.datosFuente, 'datosFuente')
    });
    
  }

  redirect(idCita: number){
    this.router.navigateByUrl('admin/appointment/edit-appointment',{state: {idCita}});
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

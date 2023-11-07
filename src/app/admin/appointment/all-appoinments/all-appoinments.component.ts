import { Direction } from '@angular/cdk/bidi';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormComponent } from 'app/contacts/form/form.component';
import { Appointments } from 'app/doctor/appointments/appointments.model';
import { AppointmentsService } from 'app/doctor/appointments/appointments.service';
import { DoctorsService } from '../../doctors/alldoctors/doctors.service';
import { Medico, Medicos } from 'app/interfaces/Medico.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitaResponse } from 'app/interfaces/Cita.interface';

@Component({
  selector: 'app-all-appoinments',
  templateUrl: './all-appoinments.component.html',
  styleUrls: ['./all-appoinments.component.scss'],
  providers: [AppointmentsService, DoctorsService]
})
export class AllAppoinmentsComponent {
 
  filterToggle = false;
  displayedColumns = [
    'name',
    'dateTime',
    'medic',
    'email',
    'mobile',
    'disease',
    'actions',
  ];
  currentDate = new Date().toISOString();
  estatus: number = 1;
  exampleDatabase?: AppointmentsService;
  dataSource = new MatTableDataSource<CitaResponse>();
  isTableVisible: boolean = false;

  medics: Medico[] = [];
  minDate: Date = new Date();

  allAppoinmentsForm: FormGroup = this.fb.group({
    medico: [, Validators.required],
    fecha:['', Validators.required],
  })

  datosFuente: CitaResponse[] = [];
  selection = new SelectionModel<Appointments>(true, []);
  id?: number;
  appointments?: Appointments;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public appointmentsService: AppointmentsService,
    public doctorsService: DoctorsService,
    private snackBar: MatSnackBar,
    public router: Router,
    public fb:FormBuilder
  ) {
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

    this.doctorsService.getAllDoctorss().subscribe( data => {
      this.medics = data.medicos;
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

  campoEsValido(campo: string){
    return this.allAppoinmentsForm.controls[campo].errors && this.allAppoinmentsForm.controls[campo].touched;
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday and days before from being selected.
    return day !== 0 && day !== 6;
  
  };

  search(){
    if(!this.allAppoinmentsForm.valid){
      this.allAppoinmentsForm.markAllAsTouched();
      return;
    }
    let fecha = new Date(this.allAppoinmentsForm.value.fecha).toISOString();
    let idMedico = this.allAppoinmentsForm.value.medico;
    this.appointmentsService.postAppoinmentsByDateAndMedic(idMedico, fecha).subscribe( data => {
      console.log(data);
      this.isTableVisible = true;

        this.datosFuente = data.citasDelDia;
        console.log(this.datosFuente)
        this.dataSource = new MatTableDataSource(this.datosFuente)
  
        this.datosFuente.forEach( cita => {
          cita.fecha_cita = new Date(cita.fecha_cita).toLocaleString();
        });
        console.log(this.datosFuente, 'datosFuente')
      
    });
  }

  onDateChange(event: any) {

    console.log(event)

    // let horarios: any = [];
    // this.horariosLibres = [];
    // this.scheduleService.getAllSchedule().subscribe({
    //   next: (data) => {
    //     horarios = data;
    //     console.log(horarios, 'horarios')
      
    //     this.appoinmentsService.getTakenSlots(new Date(event.value).toISOString()).subscribe( (data: any) => {
    //       let takenSlotsMap: any[] = data.arrayTakenSlots.map( (element: string) => new Date(element).getUTCHours());
    //       let schedulesMap  = horarios.horarios.map( (element: any) => element.horario );

    //       schedulesMap.forEach( (element: any) => {
    //         for(let index = 0; index < takenSlotsMap.length; index++){
    //           if( element === takenSlotsMap[index] ){
    //             this.horariosLibres.push({value: element, name: `${ element }:00 - ${ element + 1 }:00`, isDisable: true});
    //             return;
    //           }
    //         }
    //         this.horariosLibres.push({value: element, name: `${element}:00 - ${element+1}:00`, isDisable: false});
    //       });
    //       console.log(this.horariosLibres);
    //     })
    //   }
    // });
  
    // this.newAppoinmentForm.get('fechaCita')?.setValue(new Date(event.value).toISOString())
  }

}

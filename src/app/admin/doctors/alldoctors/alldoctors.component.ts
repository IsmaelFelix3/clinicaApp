import { Direction } from '@angular/cdk/bidi';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DoctorsService } from './doctors.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Doctors } from './doctors.model';
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
import { SelectionModel } from '@angular/cdk/collections';
import {
  TableExportUtil,
  TableElement,
  UnsubscribeOnDestroyAdapter,
} from '@shared';
import { formatDate } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Medico, MedicoTable } from 'app/interfaces/Medico.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-alldoctors',
  templateUrl: './alldoctors.component.html',
  styleUrls: ['./alldoctors.component.scss'],
})
export class AlldoctorsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    // 'select',
    'idMedico',
    'nombre',
    'especialidad',
    'cedula',
    'correo',
    'telefono',
    'edificio',
    'piso',
    // 'actions',
  ];
  exampleDatabase?: DoctorsService;
  dataSource = new MatTableDataSource<MedicoTable>();
  doctors: MedicoTable[] = [];
  selection = new SelectionModel<Doctors>(true, []);
  index?: number;
  id?: number;
  dataLength: number = 0;
  // doctors?: Doctors;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public doctorsService: DoctorsService,
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
  // addNew() {
  //   let tempDirection: Direction;
  //   if (localStorage.getItem('isRtl') === 'true') {
  //     tempDirection = 'rtl';
  //   } else {
  //     tempDirection = 'ltr';
  //   }
  //   const dialogRef = this.dialog.open(FormDialogComponent, {
  //     data: {
  //       doctors: this.doctors,
  //       action: 'add',
  //     },
  //     direction: tempDirection,
  //   });
  //   this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
  //     if (result === 1) {
  //       // After dialog is closed we're doing frontend updates
  //       // For add we're just pushing a new row inside DataServicex
  //       this.exampleDatabase?.dataChange.value.unshift(
  //         this.doctorsService.getDialogData()
  //       );
  //       this.refreshTable();
  //       this.showNotification(
  //         'snackbar-success',
  //         'Add Record Successfully...!!!',
  //         'bottom',
  //         'center'
  //       );
  //     }
  //   });
  // }
  // editCall(row: Doctors) {
  //   this.id = row.id;
  //   let tempDirection: Direction;
  //   if (localStorage.getItem('isRtl') === 'true') {
  //     tempDirection = 'rtl';
  //   } else {
  //     tempDirection = 'ltr';
  //   }
  //   const dialogRef = this.dialog.open(FormDialogComponent, {
  //     data: {
  //       doctors: row,
  //       action: 'edit',
  //     },
  //     direction: tempDirection,
  //   });
  //   this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
  //     if (result === 1) {
  //       // When using an edit things are little different, firstly we find record inside DataService by id
  //       const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
  //         (x) => x.id === this.id
  //       );
  //       // Then you update that record using data from dialogData (values you enetered)
  //       if (foundIndex != null && this.exampleDatabase) {
  //         this.exampleDatabase.dataChange.value[foundIndex] =
  //           this.doctorsService.getDialogData();
  //         // And lastly refresh table
  //         this.refreshTable();
  //         this.showNotification(
  //           'black',
  //           'Edit Record Successfully...!!!',
  //           'bottom',
  //           'center'
  //         );
  //       }
  //     }
  //   });
  // }
  // deleteItem(row: Doctors) {
  //   this.id = row.id;
  //   let tempDirection: Direction;
  //   if (localStorage.getItem('isRtl') === 'true') {
  //     tempDirection = 'rtl';
  //   } else {
  //     tempDirection = 'ltr';
  //   }
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     data: row,
  //     direction: tempDirection,
  //   });
  //   this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
  //     if (result === 1) {
  //       const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
  //         (x) => x.id === this.id
  //       );
  //       // for delete we use splice in order to remove single object from DataService
  //       if (foundIndex != null && this.exampleDatabase) {
  //         this.exampleDatabase.dataChange.value.splice(foundIndex, 1);

  //         this.refreshTable();
  //         this.showNotification(
  //           'snackbar-danger',
  //           'Delete Record Successfully...!!!',
  //           'bottom',
  //           'center'
  //         );
  //       }
  //     }
  //   });
  // }
  private refreshTable() {
    this.paginator?._changePageSize(this.paginator?.pageSize);
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
  //     this.selection = new SelectionModel<Doctors>(true, []);
  //   });
  //   this.showNotification(
  //     'snackbar-danger',
  //     totalSelect + ' Record Delete Successfully...!!!',
  //     'bottom',
  //     'center'
  //   );
  // }
  public loadData() {
    console.log('load data');
    this.doctorsService.getAllDoctorss().subscribe({
      complete: () => {
        
      },
      next: (value) => {
        console.log(value)
        this.doctors = value.medicos.map( element => {
          return {
            idMedico: element.id_medico,
            nombre: element.nombre,
            apellidos: element.apellidos,
            correo: element.correo,
            especialidad: element.especialidad,
            cedula: element.cedula,
            permisoSecreSalud: element.permiso_secre_salud,
            idEdificio: element.id_edificio,
            idPiso: element.id_piso,
            telefono: element.telefono
          }
        });
        this.dataSource = new MatTableDataSource(this.doctors);
        this.dataSource.paginator = this.paginator;
        this.dataLength = this.doctors.length;
      },
      error: (err) => {
        
      },
    });
    // this.exampleDatabase = new DoctorsService(this.httpClient);
    // console.log(this.exampleDatabase)
    // this.dataSource = new ExampleDataSource(
    //   this.exampleDatabase,
    //   this.paginator,
    //   this.sort
    // );
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
  //       Name: x.name,
  //       Email: x.email,
  //       Department: x.department,
  //       'Joining Date': formatDate(new Date(x.date), 'yyyy-MM-dd', 'en') || '',
  //       Specialization: x.specialization,
  //       Degree: x.degree,
  //       Mobile: x.mobile,
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
// export class ExampleDataSource extends DataSource<Doctors> {
//   filterChange = new BehaviorSubject('');
//   get filter(): string {
//     return this.filterChange.value;
//   }
//   set filter(filter: string) {
//     this.filterChange.next(filter);
//   }
//   filteredData: Doctors[] = [];
//   renderedData: Doctors[] = [];
//   constructor(
//     public exampleDatabase: DoctorsService,
//     public paginator: MatPaginator,
//     public _sort: MatSort
//   ) {
//     super();
//     // Reset to the first page when the user changes the filter.
//     this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
//   }
//   /** Connect function called by the table to retrieve one stream containing the data to render. */
//   connect(): Observable<Doctors[]> {
//     // Listen for any changes in the base data, sorting, filtering, or pagination
//     const displayDataChanges = [
//       this.exampleDatabase.dataChange,
//       this._sort.sortChange,
//       this.filterChange,
//       this.paginator.page,
//     ];
//     this.exampleDatabase.getAllDoctorss();
//     return merge(...displayDataChanges).pipe(
//       map(() => {
//         // Filter data
//         this.filteredData = this.exampleDatabase.data
//           .slice()
//           .filter((doctors: Doctors) => {
//             const searchStr = (
//               doctors.name +
//               doctors.department +
//               doctors.specialization +
//               doctors.degree +
//               doctors.email +
//               doctors.mobile
//             ).toLowerCase();
//             return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
//           });
//         // Sort filtered data
//         const sortedData = this.sortData(this.filteredData.slice());
//         // Grab the page's slice of the filtered sorted data.
//         const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
//         this.renderedData = sortedData.splice(
//           startIndex,
//           this.paginator.pageSize
//         );
//         return this.renderedData;
//       })
//     );
//   }
//   // eslint-disable-next-line @typescript-eslint/no-empty-function
//   disconnect() {}
//   /** Returns a sorted copy of the database data. */
//   sortData(data: Doctors[]): Doctors[] {
//     if (!this._sort.active || this._sort.direction === '') {
//       return data;
//     }
//     return data.sort((a, b) => {
//       let propertyA: number | string = '';
//       let propertyB: number | string = '';
//       switch (this._sort.active) {
//         case 'id':
//           [propertyA, propertyB] = [a.id, b.id];
//           break;
//         case 'name':
//           [propertyA, propertyB] = [a.name, b.name];
//           break;
//         case 'email':
//           [propertyA, propertyB] = [a.email, b.email];
//           break;
//         case 'date':
//           [propertyA, propertyB] = [a.date, b.date];
//           break;
//         case 'time':
//           [propertyA, propertyB] = [a.department, b.department];
//           break;
//         case 'mobile':
//           [propertyA, propertyB] = [a.mobile, b.mobile];
//           break;
//       }
//       const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
//       const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
//       return (
//         (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
//       );
//     });
//   }
// }

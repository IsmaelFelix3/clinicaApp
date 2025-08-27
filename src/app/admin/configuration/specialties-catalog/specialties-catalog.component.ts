import { Direction } from '@angular/cdk/bidi';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import { BehaviorSubject, Observable, merge, map, fromEvent } from 'rxjs';
import { FormDialogComponent } from '../specialties-catalog/dialog/form-dialog/form-dialog.component';
import { SpecialtiesService } from 'app/services/specialties.service';
import { Especialidad } from 'app/interfaces/Especialidad';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-specialties-catalog',
  templateUrl: './specialties-catalog.component.html',
  styleUrls: ['./specialties-catalog.component.scss']
})
export class SpecialtiesCatalogComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

    displayedColumns = [
      'id_especialidad',
      'nombre_especialidad',
      'actions',
    ];
    exampleDatabase?: any;
    dataSource = new MatTableDataSource<Especialidad>();
    specialties: Especialidad[] = [];
    selection = new SelectionModel<any>(true, []);
    index?: number;
    id!: number;
    ambulanceList?: any;
    dataLength: number = 0;
    constructor(
      public httpClient: HttpClient,
      public dialog: MatDialog,
      public specialtiesService: SpecialtiesService,
      private snackBar: MatSnackBar,
      public router: Router
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
    addNew() {
      let tempDirection: Direction;
      if (localStorage.getItem('isRtl') === 'true') {
        tempDirection = 'rtl';
      } else {
        tempDirection = 'ltr';
      }
      this.router.navigateByUrl('admin/configuration/addSpecialty');

      // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      //   if (result === 1) {
      //     // After dialog is closed we're doing frontend updates
      //     // For add we're just pushing a new row inside DataService
      //     this.exampleDatabase?.dataChange.value.unshift(
      //       this.ambulanceListService.getDialogData()
      //     );
      //     this.refreshTable();
      //     this.showNotification(
      //       'snackbar-success',
      //       'Add Record Successfully...!!!',
      //       'bottom',
      //       'center'
      //     );
      //   }
      // });
    }
    editCall(row: any) {
       this.router.navigateByUrl('admin/configuration/editSpecialty',{state: {id: row.id_especialidad}});
      // this.id = row.id_especialidad;
      // console.log(this.id)
      // let tempDirection: Direction;
      // if (localStorage.getItem('isRtl') === 'true') {
      //   tempDirection = 'rtl';
      // } else {
      //   tempDirection = 'ltr';
      // }
      // const dialogRef = this.dialog.open(FormDialogComponent, {
      //   data: {
      //     ambulanceList: row,
      //     action: 'edit',
      //   },
      //   direction: tempDirection,
      // });
      // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      //   if (result === 1) {
      //     // When using an edit things are little different, firstly we find record inside DataService by id
      //     const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
      //       (x: any) => x.id === this.id
      //     );
      //     // Then you update that record using data from dialogData (values you enetered)
      //     if (foundIndex != null && this.exampleDatabase) {
      //       this.exampleDatabase.dataChange.value[foundIndex] = this.specialtiesService.getDialogData();
      //       // And lastly refresh table
      //       this.refreshTable();
      //       this.showNotification(
      //         'black',
      //         'Edit Record Successfully...!!!',
      //         'bottom',
      //         'center'
      //       );
      //     }
      //   }
      // });
    }
    deleteItem(row: Especialidad) {
    this.id = row.id_especialidad;
      console.log(row)
       Swal.fire({
            title: "¿Desea eliminar esta especialidad?",
            text: "No podras revertir esto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar"
          }).then((result) => {
            if (result.isConfirmed) {
              this.specialtiesService.deleteSpecialty(this.id).subscribe({
                next: (value) => {
                  this.showNotification(
                    'snackbar-danger',
                    'Registro Eliminado Exitosamente...!!!',
                    'top',
                    'end'
                  );
                },
                complete: () => {
                  this.refresh();
                },
                error: (data) => {
                  Swal.fire({icon: 'error',title:'Error al eliminar el registro', text: data.msg});
                  this.loadData();
                },
              })
            }
          });
    }
    private refreshTable() {
      this.paginator._changePageSize(this.paginator.pageSize);
    }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      //  const numSelected = this.selection.selected.length;
      // const numRows = this.dataSource.renderedData.length;
      // return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      // this.isAllSelected()
      //   ? this.selection.clear()
      //   : this.dataSource.renderedData.forEach((row) =>
      //       this.selection.select(row)
      //     );
    }
    removeSelectedRows() {
      // const totalSelect = this.selection.selected.length;
      // this.selection.selected.forEach((item) => {
      //   const index: number = this.dataSource.renderedData.findIndex(
      //     (d) => d === item
      //   );
      //   // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      //   this.exampleDatabase?.dataChange.value.splice(index, 1);
      //   this.refreshTable();
      //   this.selection = new SelectionModel<AmbulanceList>(true, []);
      // });
      // this.showNotification(
      //   'snackbar-danger',
      //   totalSelect + ' Record Delete Successfully...!!!',
      //   'bottom',
      //   'center'
      // );
    }
    public loadData() {
     this.specialtiesService.getSpecialties().subscribe({
           complete: () => {
           },
           next: (value) => {
             this.specialties = value.specialties.rows;
             console.log(this.specialties)
             this.dataSource = new MatTableDataSource(this.specialties);
             this.dataSource.paginator = this.paginator;
             this.dataLength = this.specialties.length;
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
    // export table data in excel file
    exportExcel() {
      // // key name with space add in brackets
      // const exportData: Partial<TableElement>[] =
      //   this.dataSource.filteredData.map((x) => ({
      //     'Vehicle No': x.vehicle_no,
      //     'Vehicle Name': x.vehicle_name,
      //     'Year Made': x.year_made,
      //     'Driver Name': x.driver_name,
      //     'Driver License No': x.driver_license_no,
      //     'Driver No': x.driver_no,
      //     'Vehicle Type': x.vehicle_type,
      //   }));
      // TableExportUtil.exportToExcel(exportData, 'excel');
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

  export class ExampleDataSource extends DataSource<any> {
    filterChange = new BehaviorSubject('');
    get filter(): string {
      return this.filterChange.value;
    }
    set filter(filter: string) {
      this.filterChange.next(filter);
    }
    filteredData: any[] = [];
    renderedData: any[] = [];
    constructor(
      public exampleDatabase: any,
      public paginator: MatPaginator,
      public _sort: MatSort
    ) {
      super();
      // Reset to the first page when the user changes the filter.
      this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
    }
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]> {
      // Listen for any changes in the base data, sorting, filtering, or pagination
      const displayDataChanges = [
        this.exampleDatabase.dataChange,
        this._sort.sortChange,
        this.filterChange,
        this.paginator.page,
      ];
      this.exampleDatabase.getAllAmbulanceLists();
      return merge(...displayDataChanges).pipe(
        map(() => {
          // Filter data
          this.filteredData = this.exampleDatabase.data
            .slice()
            .filter((ambulanceList: any) => {
              const searchStr = (
                ambulanceList.vehicle_no +
                ambulanceList.vehicle_name +
                ambulanceList.year_made +
                ambulanceList.driver_name +
                ambulanceList.driver_license_no +
                ambulanceList.driver_no +
                ambulanceList.vehicle_type
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
          return this.renderedData;
        })
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    disconnect() {}
    /** Returns a sorted copy of the database data. */
    sortData(data: any[]): any[] {
      if (!this._sort.active || this._sort.direction === '') {
        return data;
      }
      return data.sort((a, b) => {
        let propertyA: number | string = '';
        let propertyB: number | string = '';
        switch (this._sort.active) {
          case 'id':
            [propertyA, propertyB] = [a.id, b.id];
            break;
          case 'vehicle_no':
            [propertyA, propertyB] = [a.vehicle_no, b.vehicle_no];
            break;
          case 'vehicle_name':
            [propertyA, propertyB] = [a.vehicle_name, b.vehicle_name];
            break;
          case 'year_made':
            [propertyA, propertyB] = [a.year_made, b.year_made];
            break;
          case 'driver_name':
            [propertyA, propertyB] = [a.driver_name, b.driver_name];
            break;
          case 'driver_license_no':
            [propertyA, propertyB] = [a.driver_license_no, b.driver_license_no];
            break;
          case 'driver_no':
            [propertyA, propertyB] = [a.driver_no, b.driver_no];
            break;
          case 'vehicle_type':
            [propertyA, propertyB] = [a.vehicle_type, b.vehicle_type];
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

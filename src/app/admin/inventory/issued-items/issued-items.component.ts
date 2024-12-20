import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IssuedItemsService } from './issued-items.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IssuedItems } from './issued-items.model';
import { DataSource } from '@angular/cdk/collections';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './dialog/delete/delete.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { Direction } from '@angular/cdk/bidi';
import {
  TableExportUtil,
  TableElement,
  UnsubscribeOnDestroyAdapter,
} from '@shared';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-issued-items',
  templateUrl: './issued-items.component.html',
  styleUrls: ['./issued-items.component.scss'],
})
export class IssuedItemsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    // 'select',
    'procedimiento',
    'medico',
    'paciente',
    // 'return_date',
    'fechaEmitido',
    'qty',
    'insumos',
    // 'actions',
  ];
  exampleDatabase?: IssuedItemsService;
  // dataSource!: ExampleDataSource;
  selection = new SelectionModel<IssuedItems>(true, []);
  index?: number;
  id?: number;
  issuedItems?: IssuedItems;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public issuedItemsService: IssuedItemsService,
    private snackBar: MatSnackBar
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;
  ngOnInit() {
    // this.loadData();
  }
  // refresh() {
  //   this.loadData();
  // }
  addNew() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        issuedItems: this.issuedItems,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase?.dataChange.value.unshift(
          this.issuedItemsService.getDialogData()
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
  editCall(row: IssuedItems) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        issuedItems: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        if (foundIndex != null && this.exampleDatabase) {
          this.exampleDatabase.dataChange.value[foundIndex] =
            this.issuedItemsService.getDialogData();
          // And lastly refresh table
          this.refreshTable();
          this.showNotification(
            'black',
            'Edit Record Successfully...!!!',
            'bottom',
            'center'
          );
        }
      }
    });
  }
  deleteItem(row: IssuedItems) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        if (foundIndex != null && this.exampleDatabase) {
          this.exampleDatabase.dataChange.value.splice(foundIndex, 1);

          this.refreshTable();
          this.showNotification(
            'snackbar-danger',
            'Delete Record Successfully...!!!',
            'bottom',
            'center'
          );
        }
      }
    });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    // const numRows = this.dataSource.renderedData.length;
    // return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected()
  //     ? this.selection.clear()
  //     : this.dataSource.renderedData.forEach((row) =>
  //         this.selection.select(row)
  //       );
  // // }
  // removeSelectedRows() {
  //   const totalSelect = this.selection.selected.length;
  //   this.selection.selected.forEach((item) => {
  //     const index: number = this.dataSource.renderedData.findIndex(
  //       (d) => d === item
  //     );
  //     // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
  //     this.exampleDatabase?.dataChange.value.splice(index, 1);
  //     this.refreshTable();
  //     this.selection = new SelectionModel<IssuedItems>(true, []);
  //   });
  //   this.showNotification(
  //     'snackbar-danger',
  //     totalSelect + ' Record Delete Successfully...!!!',
  //     'bottom',
  //     'center'
  //   );
  // }
  // public loadData() {
  //   this.exampleDatabase = new IssuedItemsService(this.httpClient);
  //   this.dataSource = new ExampleDataSource(
  //     this.exampleDatabase,
  //     this.paginator,
  //     this.sort
  //   );
  //   this.subs.sink = fromEvent(this.filter?.nativeElement, 'keyup').subscribe(
  //     () => {
  //       if (!this.dataSource) {
  //         return;
  //       }
  //       this.dataSource.filter = this.filter?.nativeElement.value;
  //     }
  //   );
  // }
  // export table data in excel file
  // exportExcel() {
  //   // key name with space add in brackets
  //   const exportData: Partial<TableElement>[] =
  //     this.dataSource.filteredData.map((x) => ({
  //       'Item Name': x.i_name,
  //       Category: x.category,
  //       'Issue Date':
  //         formatDate(new Date(x.issue_date), 'yyyy-MM-dd', 'en') || '',
  //       'Return Date':
  //         formatDate(new Date(x.return_date), 'yyyy-MM-dd', 'en') || '',
  //       'Issue To': x.issue_to,
  //       Quantity: x.qty,
  //       Status: x.status,
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
// export class ExampleDataSource extends DataSource<IssuedItems> {
//   filterChange = new BehaviorSubject('');
//   get filter(): string {
//     return this.filterChange.value;
//   }
//   set filter(filter: string) {
//     this.filterChange.next(filter);
//   }
//   filteredData: IssuedItems[] = [];
//   renderedData: IssuedItems[] = [];
//   constructor(
//     public exampleDatabase: IssuedItemsService,
//     public paginator: MatPaginator,
//     public _sort: MatSort
//   ) {
//     super();
//     // Reset to the first page when the user changes the filter.
//     this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
//   }
//   /** Connect function called by the table to retrieve one stream containing the data to render. */
//   connect(): Observable<IssuedItems[]> {
//     // Listen for any changes in the base data, sorting, filtering, or pagination
//     const displayDataChanges = [
//       this.exampleDatabase.dataChange,
//       this._sort.sortChange,
//       this.filterChange,
//       this.paginator.page,
//     ];
//     this.exampleDatabase.getAllIssuedItemss();
//     return merge(...displayDataChanges).pipe(
//       map(() => {
//         // Filter data
//         this.filteredData = this.exampleDatabase.data
//           .slice()
//           .filter((issuedItems: IssuedItems) => {
//             const searchStr = (
//               issuedItems.i_name +
//               issuedItems.category +
//               issuedItems.issue_date +
//               issuedItems.return_date +
//               issuedItems.issue_to +
//               issuedItems.qty +
//               issuedItems.status
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
//   sortData(data: IssuedItems[]): IssuedItems[] {
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
//         case 'i_name':
//           [propertyA, propertyB] = [a.i_name, b.i_name];
//           break;
//         case 'category':
//           [propertyA, propertyB] = [a.category, b.category];
//           break;
//         case 'issue_date':
//           [propertyA, propertyB] = [a.issue_date, b.issue_date];
//           break;
//         case 'return_date':
//           [propertyA, propertyB] = [a.return_date, b.return_date];
//           break;
//         case 'issue_to':
//           [propertyA, propertyB] = [a.issue_to, b.issue_to];
//           break;
//         case 'qty':
//           [propertyA, propertyB] = [a.qty, b.qty];
//           break;
//         case 'status':
//           [propertyA, propertyB] = [a.status, b.status];
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

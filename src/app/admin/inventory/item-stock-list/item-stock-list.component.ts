import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ItemStockListService } from './item-stock-list.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ItemStockList } from './item-stock-list.model';
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
import { MatTableDataSource } from '@angular/material/table';
import { Insumo, Insumos } from 'app/interfaces/Insumo';
import { Router } from '@angular/router';


@Component({
  selector: 'app-item-stock-list',
  templateUrl: './item-stock-list.component.html',
  styleUrls: ['./item-stock-list.component.scss'],
})
export class ItemStockListComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    // 'select',
    // 'id_insumo',
    'codigo',
    'descripcion',
    // 'estado',
    'facturaCompra',
    'numeroLote',
    'fechaCaducidad',
    'cantidadActual'
    // 'actions',
  ];
  exampleDatabase?: ItemStockListService;
  dataSource = new MatTableDataSource<Insumo>();
  selection = new SelectionModel<ItemStockList>(true, []);
  index?: number;
  id?: number;
  itemStockList?: ItemStockList;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public itemStockService: ItemStockListService,
    public itemStockListService: ItemStockListService,
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
    console.log('entro')
    this.loadData();
  }

  // onFileChange(event: any): void {
  //   console.log(event)
  //   const file = event.target.files[0];
  //   const fileReader = new FileReader();

  //   fileReader.onload = (e: any) => {
  //     const arrayBuffer = e.target.result;
  //     this.parseExcel(arrayBuffer);
  //   };
  //   fileReader.readAsArrayBuffer(file);
  // }

  // parseExcel(arrayBuffer: any): void {
  //   const workbook = new ExcelJS.Workbook();
  //   workbook.xlsx.load(arrayBuffer).then((workbook) => {
  //     let jsonData: any[] = [];
  //     workbook.eachSheet((worksheet, sheetId) => {
  //       worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
  //         const headers: any = worksheet.getRow(1).values;
  //         if(row.number != 1){
  //           let rowData: any = {};
  //           row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
  //             rowData[`${headers[colNumber]}`] = cell.value;            
  //           });
  //           jsonData.push(rowData);
  //         }
  //       });
  //     });
  
  //     console.log(jsonData);
  //   });
  // }

  addSupply() {
    console.log(this.router)
    this.router.navigateByUrl('/admin/inventory/item-stock');
    // let tempDirection: Direction;
    // if (localStorage.getItem('isRtl') === 'true') {
    //   tempDirection = 'rtl';
    // } else {
    //   tempDirection = 'ltr';
    // }
    // const dialogRef = this.dialog.open(FormDialogComponent, {
    //   data: {
    //     itemStockList: this.itemStockList,
    //     action: 'add',
    //   },
    //   direction: tempDirection,
    // });
    // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 1) {
    //     // After dialog is closed we're doing frontend updates
    //     // For add we're just pushing a new row inside DataService
    //     this.exampleDatabase?.dataChange.value.unshift(
    //       this.itemStockListService.getDialogData()
    //     );
    //     this.refresh();
    //     this.refreshTable();
        // this.showNotification(
        //   'snackbar-success',
        //   'Add Record Successfully...!!!',
        //   'bottom',
        //   'center'
        // );
    //   }
    // });
  }

  getStatus(status: boolean){
    // console.log('entrooooooooooooooooo')
    if(status == true ){
      return 'mat-primary';
    }
    else { 
      return 'mat-warn';
    }

  }

  editCall(row: ItemStockList) {
    this.id = row.id_insumo;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        item: row,
        action: 'edit',
      },
      direction: tempDirection,
    });

    // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    //   console.log(result)
    //   console.log(this.exampleDatabase?.dataChange.value)
    //   if (result === 1) {
    //     // When using an edit things are little different, firstly we find record inside DataService by id
    //     const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
    //       (x) => x.id_insumo === this.id
    //     );
    //     console.log(foundIndex)
    //     // Then you update that record using data from dialogData (values you enetered)
    //     if (foundIndex != null && this.exampleDatabase) {
    //       this.exampleDatabase.dataChange.value[foundIndex] =
    //         this.itemStockListService.getDialogData();
    //       // And lastly refresh table
    //       this.refreshTable();
    //     }
    //   }
    // });
  }
  deleteItem(row: ItemStockList) {
    this.id = row.id_insumo;
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
          (x) => x.id_insumo === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        if (foundIndex != null && this.exampleDatabase) {
          this.exampleDatabase.dataChange.value.splice(foundIndex, 1);

          this.refreshTable();
          // this.showNotification(
          //   'snackbar-danger',
          //   'Delete Record Successfully...!!!',
          //   'bottom',
          //   'center'
          // );
        }
      }
    });
  }

  redirect(row: Insumo){
    this.router.navigateByUrl('admin/inventory/edit-item',{state: {row}});
  }

  private refreshTable() {
    // this.paginator._changePageSize(this.paginator.pageSize);
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
  //     this.selection = new SelectionModel<ItemStockList>(true, []);
  //   });
  //   this.showNotification(
  //     'snackbar-danger',
  //     totalSelect + ' Record Delete Successfully...!!!',
  //     'bottom',
  //     'center'
  //   );
  // }
  public loadData() {
    // this.exampleDatabase = new ItemStockListService(this.httpClient);

    this.itemStockService.getAllItemStockLists().subscribe({
          next: (data) => {
            console.log(data)
            this.itemStockService.isTblLoading = false;
            this.dataSource = new MatTableDataSource(data.insumos.rows);
            this.itemStockService.dataChange.next(data.insumos.rows);
          },
          error: (error: HttpErrorResponse) => {
            this.itemStockService.isTblLoading = false;
            console.log(error.name + ' ' + error.message);
          },
        });
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
  exportExcel() {
    // key name with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x:any) => ({
        'Codigo': x.codigo,
        'Nombre': x.descripcion,
        'Estado': x.estado,
        'Fecha Alta': formatDate(new Date(x.date), 'yyyy-MM-dd', 'sp') || '',
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
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

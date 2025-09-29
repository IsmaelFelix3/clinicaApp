import { Direction } from '@angular/cdk/bidi';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Banco } from 'app/interfaces/Banco';
import { Registro } from 'app/interfaces/Bitacora';
import { BuildingLogService } from 'app/services/building-log.service';
import { fromEvent } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-building-log',
  templateUrl: './building-log.component.html',
  styleUrls: ['./building-log.component.scss']
})
export class BuildingLogComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

    displayedColumns = [
      'type',
      'name',
      'companion',
      'motive',
      'medic',
      'entrance',
      'exit',
      'actions'
    ];

    dataSource = new MatTableDataSource<Registro>();
    records: Registro[] = [];
    selection = new SelectionModel<any>(true, []);
    id!: number;
    dataLength: number = 0;
    constructor(
      public httpClient: HttpClient,
      public dialog: MatDialog,
      public buildingLogService: BuildingLogService,
      private snackBar: MatSnackBar,
      public router: Router
    ){
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
      this.router.navigateByUrl('admin/accessLog/addBuildingLog');

    }
    editCall(row: any) {
        this.router.navigateByUrl('admin/accessLog/editBank',{state: {id: row.id_banco}});
    }

    deleteItem(row: Banco) {
    this.id = row.id_banco;
      console.log(row)
        Swal.fire({
            title: "¿Desea eliminar este registro?",
            text: "No podras revertir esto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar"
          }).then((result) => {
            if (result.isConfirmed) {
              // this.banksServcie.deleteBank(this.id).subscribe({
              //   next: (value) => {
              //     this.showNotification(
              //       'snackbar-danger',
              //       'Registro Eliminado Exitosamente...!!!',
              //       'top',
              //       'end'
              //     );
              //   },
              //   complete: () => {
              //     this.refresh();
              //   },
              //   error: (data) => {
              //     Swal.fire({icon: 'error',title:'Error al eliminar el registro', text: data.msg});
              //     this.loadData();
              //   },
              // })
            }
          });
    }
    private refreshTable() {
      this.paginator._changePageSize(this.paginator.pageSize);
    }


    public loadData() {
      this.buildingLogService.getRecords().subscribe({
            complete: () => {
            },
            next: (value) => {
              console.log(value)
              this.records = value.registros.rows;
              this.dataSource = new MatTableDataSource(this.records);
              this.dataSource.paginator = this.paginator;
              this.dataLength = this.records.length;
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

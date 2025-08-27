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
import { FormaPago } from 'app/interfaces/FormaPago';
import { BankService } from 'app/services/bank.service';
import { PaymentMethodService } from 'app/services/payment-method.service';
import { fromEvent } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-methods-catalog',
  templateUrl: './payment-methods-catalog.component.html',
  styleUrls: ['./payment-methods-catalog.component.scss']
})
export class PaymentMethodsCatalogComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    'id_forma_pago',
    'nombre_forma_pago',
    'actions',
  ];

  dataSource = new MatTableDataSource<FormaPago>();
  paymentMethods: FormaPago[] = [];
  selection = new SelectionModel<any>(true, []);
  index?: number;
  id!: number;
  ambulanceList?: any;
  dataLength: number = 0;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public paymentMethodService: PaymentMethodService,
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
    this.router.navigateByUrl('admin/accounting/addPaymentMethod');


  }
  editCall(row: any) {
      this.router.navigateByUrl('admin/accounting/editPaymentMethod',{state: {id: row.id_forma_pago}});
  }

  deleteItem(row: FormaPago) {
  this.id = row.id_forma_pago;
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
            this.paymentMethodService.deletePaymentMethod(this.id).subscribe({
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


  public loadData() {
    this.paymentMethodService.getPaymentMethods().subscribe({
          complete: () => {
          },
          next: (value) => {
            this.paymentMethods = value.formasPago.rows;
            this.dataSource = new MatTableDataSource(this.paymentMethods);
            this.dataSource.paginator = this.paginator;
            this.dataLength = this.paymentMethods.length;
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

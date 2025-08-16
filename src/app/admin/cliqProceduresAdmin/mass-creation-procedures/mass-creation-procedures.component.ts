import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';
import { ItemStockListService } from 'app/admin/inventory/item-stock-list/item-stock-list.service';
import { InsumoExcel } from 'app/interfaces/Insumo';
import Swal from 'sweetalert2';
import * as ExcelJS from 'exceljs';

@Component({
  selector: 'app-mass-creation-procedures',
  templateUrl: './mass-creation-procedures.component.html',
  styleUrls: ['./mass-creation-procedures.component.scss']
})
export class MassCreationProceduresComponent {


    fecha: string = '';
    jsonData: any[] = [];
    showTable: boolean = false;
    showResults: boolean = false;
    dataSource!: MatTableDataSource<InsumoExcel>;
    dataLength: number = 0;
    disableSave: boolean = true;

    displayedColumns = [
      'folio',
      'nombrePaciente',
      'Procedimiento',
      'nombreDoctor',
      'FechaRegistro',
      'formaPago',
      'costo',
      'quirofano'
    ];


    constructor(private router: Router, private insumosService: ItemStockListService,
                public fb: FormBuilder, public doctorService: DoctorsService,
                private cdr: ChangeDetectorRef,
                private snackBar: MatSnackBar, ){}

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    onFileChange(event: any): void {
      this.disableSave = true;
      const file = event.target.files[0];
      const fileReader = new FileReader();

      fileReader.onload = (e: any) => {
        const arrayBuffer = e.target.result;
        this.parseExcel(arrayBuffer);
      };
      fileReader.readAsArrayBuffer(file);
    }

    parseExcel(arrayBuffer: any): void {
      this.jsonData = [];
      const workbook = new ExcelJS.Workbook();
      workbook.xlsx.load(arrayBuffer).then((workbook) => {

        workbook.eachSheet((worksheet, sheetId) => {
          worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
            const headers: any = worksheet.getRow(1).values;
            if(row.number != 1){
              let rowData: any = {};
              row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                rowData[`${headers[colNumber]}`] = cell.value;
              });

              this.jsonData.push(rowData);
            }
          });
        });

        this.showTable = true;
        this.dataLength = this.jsonData.length;
        this.dataSource = new MatTableDataSource(this.jsonData);
        this.cdr.detectChanges();
        this.dataSource.paginator = this.paginator;
      });
    }

    saveData(){

      console.log(this.jsonData)

      // let groups: any = {};

      // for (let i = 0; i < this.jsonData.length; i++) {
      //     let groupName = this.jsonData[i].procedimiento;
      //     if (!groups[groupName]) {
      //       groups[groupName] = [];
      //     }
      //       groups[groupName].push(this.jsonData[i]);
      // }
      //   let myArray = [];

      // for (let groupName in groups) {
      //   myArray.push({group: groupName, values: groups[groupName]});
      // }
      // const data = JSON.stringify(myArray);

      // this.insumosService.addItemsMasive(data).subscribe({
      //   complete: () => {
      //     this.disableSave = false;
      //   },
      //   next: (value) => {
      //     if(value.newProcedures.length === 0){
      //       Swal.fire({
      //         title: "No se cargaron procedimientos.",
      //         text: value.msg,
      //         icon: "warning"
      //       });
      //     }
      //     else if(value.existing.length === 0){
      //       Swal.fire({
      //         title: "Carga masiva exitosa",
      //         text: "Todos los procedimientos fueron cargados.",
      //         icon: "success"
      //       });
      //     }
      //     else{
      //       Swal.fire({
      //         title: "Carga masiva exitosa con detalles",
      //         text: `Algunos procedimientos no pudieron ser asignados ya que el folio del procedimiento ya existe favor de revisar los folios ${value.existing}.`,
      //         icon: "warning"
      //       });
      //     }

      //   },
      //   error(err) {

      //   },
      // });


      // this.showNotification(
      //   'snackbar-success',
      //   'Guardado Exitoso...!!!',
      //   'top',
      //   'right'
      // );
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

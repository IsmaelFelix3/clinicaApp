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
import { CliqProceduresService } from 'app/services/cliq-procedures.service';
import { Medico } from 'app/interfaces/Medico.interface';
import { ProcedimientoCatalogo } from 'app/interfaces/CatalogoProcedimientos';
import { ProceduresCatalogService } from 'app/services/procedures-catalog.service';

@Component({
  selector: 'app-mass-creation-procedures',
  templateUrl: './mass-creation-procedures.component.html',
  styleUrls: ['./mass-creation-procedures.component.scss']
})
export class MassCreationProceduresComponent {


    doctors: Medico[] = [];
    procedures: ProcedimientoCatalogo [] = [];

    fecha: string = '';
    jsonData: any[] = [];
    result: any[] = [];
    showTable: boolean = false;
    showResults: boolean = false;
    dataSource!: MatTableDataSource<InsumoExcel>;
    dataLength: number = 0;
    disableSave: boolean = true;

    displayedColumns = [
      'serie',
      'nombrePaciente',
      'nombreDoctor',
      'procedimiento',
      'fechaInicio',
      // 'formaPago',
      // 'costo',
      // 'quirofano',
      // 'estatus'
    ];


    constructor(private router: Router, private insumosService: ItemStockListService,
                public fb: FormBuilder, public doctorService: DoctorsService,
                private cdr: ChangeDetectorRef,
                private snackBar: MatSnackBar,
                public cliqProceduresService: CliqProceduresService,
                public doctorsService: DoctorsService,
                public catalogoProcedimientos: ProceduresCatalogService ){}

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

      this.doctorService.getAllDoctorss().subscribe( data => {
        this.doctors = data.medicos;
        this.catalogoProcedimientos.getAllProceduresDetails().subscribe( data => {
          this.procedures = data.catalogoProcedimiento.rows;
          this.result = this.jsonData.map( element => {
            console.log(element)
            let doctor = this.doctors.filter( item => item.id_medico == element.doctor);
            let procedure = this.procedures.filter( item => item.id_procedimiento == element.procedimiento);
            return {
              serie: element.serie,
              nombre_paciente: element.nombre_paciente,
              apellidos_paciente: element.apellidos_paciente,
              procedimiento: procedure[0].nombre_procedimiento,
              doctor: doctor[0].nombre + ' ' + doctor[0].apellidos,
              fecha_procedimiento_inicio: element.fecha_procedimiento_inicio,
              fecha_procedimiento_fin: element.fecha_procedimiento_fin,
              forma_pago: element.forma_pago,
              costo: element.costo,
              banco: element.banco,
              quirofano: element.quirofano
            }
          });
            this.showTable = true;
            this.dataLength = this.result.length;
            console.log(this.result)
            this.dataSource = new MatTableDataSource(this.result);
            this.cdr.detectChanges();
            this.dataSource.paginator = this.paginator;
        });
      });
      });
    }

    saveData(){

      console.log(this.jsonData)
      this.cliqProceduresService.postMassCreationProcedures( JSON.stringify(this.jsonData )).subscribe({
        complete: () => {
          this.disableSave = false;
        },
        next: (value) => {
          Swal.fire({
            title: "Guardado Exitoso",
            icon: "success"
          });
        },
        error: (err) => {
          Swal.fire({
            title: "Error al guardar consulte con el administrador",
            icon: "warning"
          });
        },
      })
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

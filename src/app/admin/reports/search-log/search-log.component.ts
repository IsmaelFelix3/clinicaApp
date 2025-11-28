import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RegistroReport } from 'app/interfaces/Bitacora';
import { BuildingLogService } from 'app/services/building-log.service';
import { fromEvent } from 'rxjs';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import { formatDate } from '@angular/common';
import { ReportsService } from 'app/services/reports.service';



@Component({
  selector: 'app-search-log',
  templateUrl: './search-log.component.html',
  styleUrls: ['./search-log.component.scss']
})
export class SearchLogComponent extends UnsubscribeOnDestroyAdapter {

  displayedColumns = [
    'type',
    'name',
    'companion',
    'motive',
    'medic',
    'date',
    'entrance',
    'exit',
  ];

  dataSource = new MatTableDataSource<RegistroReport>();
  records: RegistroReport[] = [];
  dataLength: number = 0;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;

  constructor(public fb: FormBuilder, public buildingLogService: BuildingLogService, public reportsServices: ReportsService){
    super();
  }

  form: FormGroup = this.fb.group({
        start:['', Validators.required],
      })

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday and days before from being selected.
    return day !== 0 && day !== 7;

  };

  exportExcel() {
      // key name with space add in brackets
      const exportData: Partial<TableElement>[] =
        this.dataSource.filteredData.map((x) => ({
          'Tipo': x.tipo_ingreso,
          'Nombre': x.nombre_ingreso,
          'Acompañante': x.nombre_acompanante,
          'Motivo': x.motivo_ingreso,
          'Medico': x.id_medico == null ? 'N/A' : x.nombre + ' ' + x.apellidos ,
          'Fecha': x.fecha.toString(),
          'Entrada': x.hora_entrada,
          'Salida': x.hora_salida,
        }));
      TableExportUtil.exportToExcel(exportData, 'excel');
    }

  campoEsValido(campo: string){
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }

  search(){
    this.buildingLogService.getBuildingLogByDay(new Date(this.form.get('start')?.value).toISOString()).subscribe( data => {
      console.log(data)
      this.records = data.rows;
      this.dataSource = new MatTableDataSource(this.records);
      this.dataSource.paginator = this.paginator;
      this.dataLength = this.records.length;
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
}

import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CliqProceduresService } from 'app/services/cliq-procedures.service';
import { QuirofanosService } from 'app/services/quirofanos.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Chart } from 'chart.js/dist';
// import { ChartType } from 'ng-apexcharts';

export interface PeriodicElement {
  gasto: string;
  importe: number;
  isDivisible: boolean
}


const ELEMENT_DATA: PeriodicElement[] = [
  {gasto: 'Renta Todo Incluido 5to Piso*', importe: 0, isDivisible: true},
  {gasto: 'Mantenimiento 5to Piso 901*', importe: 0, isDivisible: true},
  {gasto: 'Poliza fumigación*', importe: 82680, isDivisible: true},
  {gasto: 'Seguro inmueble*', importe: 0, isDivisible: true},
  {gasto: 'Póliza RPBI*', importe: 0, isDivisible: true},
  {gasto: 'Papeleria', importe: 1500, isDivisible: false},
  {gasto: 'Lavanderia', importe: 5100, isDivisible: false},
  {gasto: 'INFRA', importe: 4000, isDivisible: false},
  {gasto: 'Luz', importe: 12500, isDivisible: false},
  {gasto: 'Medicamentos', importe: 42464.60, isDivisible: false},
  {gasto: 'Insumos (mercancia + gasto gral)', importe: 96024.73, isDivisible: false},
  {gasto: 'Agua, Café, galletas, refrescos', importe: 1500, isDivisible: false},
  {gasto: 'MKT Cristina*', importe: 3500, isDivisible: true},
  {gasto: 'Publicidad Pagada*', importe: 14000, isDivisible: true},
  {gasto: 'Arrendamiento Equipos*', importe: 11624.91, isDivisible: true},
  {gasto: 'Sueldos (incluye administración)*', importe: 149221.10, isDivisible: true},
  {gasto: 'IMSS, RCV, INFONAVIT, Imp nomina*', importe: 35294.71, isDivisible: true},
  {gasto: 'Honorarios anestesia', importe: 0, isDivisible: false},
  {gasto: 'Honorarios enfermeria extra', importe: 0, isDivisible: false},
  {gasto: 'ISR', importe: 0, isDivisible: false},
  {gasto: 'IVA', importe: 0, isDivisible: false},
];

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent {

  totalGastos: number = 0
  totalIngresos: number = 0
  balance: number = 0
  showIngresos: boolean =  false;
  showBalance: boolean =  false;

  constructor(private fb: FormBuilder,private _formBuilder: FormBuilder, private cliqProceduresService: CliqProceduresService,
              private operatingRoomService: QuirofanosService){}

  VOForm!: FormGroup;
  proceduresForm!: FormGroup;
  dataSource = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  daysCount: number = 0;

   form: FormGroup = this.fb.group({
      start:['', Validators.required],
      end:['', Validators.required],
    })

  ngOnInit(){

    // const data = {
    //   labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    //   datasets: [{
    //     label: 'Pie',
    //     data: [1,2,3,4],
    //     tension: 0.1

    //   }]
    // }

    // this.chart = new Chart('chart', {
    //   type: 'pie',
    //   data
    // })

    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([])
    });

    this.proceduresForm = this._formBuilder.group({
      operatingRoomsRows: this._formBuilder.array([])
    });

     this.VOForm = this.fb.group({
              VORows: this.fb.array(ELEMENT_DATA.map(val => this.fb.group({
                gasto: new FormControl(val.gasto),
                importe: new FormControl(val.importe),
                isDivisible: new FormControl(val.isDivisible),
              })
              )) //end of fb array
            }); // end of form group cretation
    // this.isLoading = false;
    console.log(this.VOForm)
    this.dataSource = new MatTableDataSource((this.VOForm.get('VORows') as FormArray).controls);
  }

  displayedColumns: string[] = ['gasto', 'importe',];
  displayedColumns2: string[] = ['ingreso', 'importe',];
  // dataSource = ELEMENT_DATA;

  calculate(){
    console.log(this.VOForm.value)
    console.log(this.proceduresForm.value)

    this.totalGastos = this.VOForm.value.VORows.reduce((accumulator: any, currentValue: any) => {
      console.log(currentValue)
      if(currentValue.isDivisible){
        return accumulator + (parseFloat(currentValue.importe) / this.daysCount)
      }
      return accumulator + parseFloat(currentValue.importe)
    },0);

    this.totalIngresos = this.proceduresForm.value.operatingRoomsRows.reduce((accumulator: any, currentValue: any) => {
      return accumulator + parseFloat(currentValue.importe)
    },0);
    console.log(this.totalGastos)
    this.balance = this.totalIngresos - this.totalGastos;
    this.showBalance = true;
  }

   myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday and days before from being selected.
    return day !== 0 && day !== 7;

  };

  calculateDays(startDate: string, endDate: string) {
    let start:any = new Date(startDate);
    let end:any = new Date(endDate);
    let timeDifference = end - start;
    let daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference + 1;
}

  search(){


    let start = this.form.value.start;
    let end = this.form.value.end;
    let newStart =  new Date(Date.UTC(new Date(start).getUTCFullYear(),new Date(start).getUTCMonth(),new Date(start).getUTCDate(),0,0,0)).toUTCString();;
    let newFecha = new Date(Date.UTC(new Date(end).getUTCFullYear(),new Date(end).getUTCMonth(),new Date(end).getUTCDate(),23,59,59)).toUTCString();

    this.daysCount = this.calculateDays(start, end)
    console.log(this.daysCount)

    this.cliqProceduresService.getPIByOR(newStart, newFecha).subscribe( data => {
      console.log(data)

    this.proceduresForm = this.fb.group({
      operatingRoomsRows: this.fb.array(data.totalIncome.rows.map(val => this.fb.group({
            ingreso: new FormControl(val.Quirofano.nombre_quirofano),
            importe: new FormControl(val.total_income)
        })
      )) //end of fb array
    }); // end of form group cretation
      // this.isLoading = false;
      console.log(this.proceduresForm)
      this.dataSource2 = new MatTableDataSource((this.proceduresForm.get('operatingRoomsRows') as FormArray).controls);
    })
    this.showIngresos = true;
  }

  campoEsValido(campo: string){
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }

  // public chart!: Chart;

  //  public pieChartData: ChartData<'pie', number[], string | string[]> = {
  //   labels: [['Download'], ['Store'], 'Mail'],
  //   datasets: [
  //     {
  //       data: [300, 500, 100],
  //       backgroundColor: ['#60A3F6', '#7C59E7', '#DD6811', '#5BCFA5'],
  //     },
  //   ],
  // };


}

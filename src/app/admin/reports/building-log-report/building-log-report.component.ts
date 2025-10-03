import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { BuildingLogService } from 'app/services/building-log.service';
import { CliqProceduresService } from 'app/services/cliq-procedures.service';
import { QuirofanosService } from 'app/services/quirofanos.service';
import { Chart, ChartConfiguration, ChartData, ChartType, Color } from 'chart.js';

import * as shape from 'd3-shape';
import { ApexAxisChartSeries, ApexNonAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexYAxis, ApexXAxis, ApexFill, ApexTooltip, ApexStroke, ApexLegend, ApexTitleSubtitle, ApexGrid, ApexMarkers, ApexResponsive } from 'ng-apexcharts';


export interface PeriodicElement {
  gasto: string;
  importe: number;
  isDivisible: boolean
}

export type ChartOptions = {
  series?: ApexAxisChartSeries;
  series2?: ApexNonAxisChartSeries;
  chart?: ApexChart;
  dataLabels?: ApexDataLabels;
  plotOptions?: ApexPlotOptions;
  yaxis?: ApexYAxis;
  xaxis?: ApexXAxis;
  fill?: ApexFill;
  tooltip?: ApexTooltip;
  stroke?: ApexStroke;
  legend?: ApexLegend;
  title?: ApexTitleSubtitle;
  colors?: string[];
  grid?: ApexGrid;
  markers?: ApexMarkers;
  labels: string[];
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-building-log-report',
  templateUrl: './building-log-report.component.html',
  styleUrls: ['./building-log-report.component.scss']
})
export class BuildingLogReportComponent {

  totalGastos: number = 0
  totalIngresos: number = 0
  balance: number = 0
  showIngresos: boolean =  false;
  showChart: boolean =  false;
  totalVisitas:number = 0;


  constructor(private fb: FormBuilder,private _formBuilder: FormBuilder, private cliqProceduresService: CliqProceduresService,
              private buildingLogService: BuildingLogService, private cdr: ChangeDetectorRef){

  }



  VOForm!: FormGroup;
  proceduresForm!: FormGroup;
  dataSource = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  daysCount: number = 0;

    form: FormGroup = this.fb.group({
      start:['', Validators.required],
      end:['', Validators.required],
    })

   // bar chart start
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: '#9aa0ac', // Font Color
        },
      },
      y: {
        ticks: {
          color: '#9aa0ac', // Font Color
        },
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets:[]
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';


  ngOnInit(){
      this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([])
    });

    this.proceduresForm = this._formBuilder.group({
      operatingRoomsRows: this._formBuilder.array([])
    });

  }

  displayedColumns: string[] = ['doctor', 'consultorio', 'total'];
  displayedColumns2: string[] = ['ingreso', 'importe',];

  calculate(){
    console.log(this.VOForm.value)
    console.log(this.proceduresForm.value)

    this.totalGastos = this.VOForm.value.VORows.reduce((accumulator: any, currentValue: any) => {
      console.log(currentValue)
      if(currentValue.isDivisible){
        return accumulator + ((parseFloat(currentValue.importe) / 30 ) * this.daysCount)
      }
      return accumulator + parseFloat(currentValue.importe)
    },0);

    this.totalIngresos = this.proceduresForm.value.operatingRoomsRows.reduce((accumulator: any, currentValue: any) => {
      return accumulator + parseFloat(currentValue.importe)
    },0);
    console.log(this.totalGastos)
    this.balance = this.totalIngresos - this.totalGastos;
    // this.showBalance = true;
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

   myCallback(element: any) {
  let dia = element.fecha
  return dia
}

  search(){

    let start = this.form.value.start;
    let end = this.form.value.end;

    let newStart =  start.getFullYear() + '-' +(start.getMonth()+1) +'-' + start.getDate();
    let newFecha = end.getFullYear() + '-' +(end.getMonth()+1) +'-' + end.getDate();

    // let newStart =  new Date(Date.UTC(new Date(start).getUTCFullYear(),new Date(start).getUTCMonth(),new Date(start).getUTCDate())).toUTCString();;
    // let newFecha = new Date(Date.UTC(new Date(end).getUTCFullYear(),new Date(end).getUTCMonth(),new Date(end).getUTCDate())).toUTCString();

    console.log(newStart)
    console.log(newFecha)

    this.buildingLogService.getBuildingLogReport(newStart, newFecha).subscribe( data => {
    console.log(data)
    let groups: any = {};

    for (let i = 0; i < data.registros.length; i++) {
      let groupName = data.registros[i].fecha.toString();
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push({ nombre: data.registros[i].apellidos.trim() + ' ' + data.registros[i].nombre.trim(),count: data.registros[i].count});
    }
      let myArray = [];

    for (let groupName in groups) {
      myArray.push({group: groupName, values: groups[groupName]});
    }



    let arr: any = []
    myArray.forEach(element => {
      for(let index = 0; index < element.values.length; index++){


        arr.push({label: element.values[index].nombre, data: element.values[index].count})
      }
    })



    let result = [];
    let info: any = []
    arr.forEach( (element:any) => {
      let name = element.label
      if (!info[name]) {
            info[name] = [];
          }
      info[name].push(element.data);


    })
    const iterator = Object.keys(info);

      for (const key of iterator) {
      this.barChartData.datasets.push({
        label: key,
        data: info[key]
      });

      }
    myArray.forEach(element => this.barChartData.labels?.push(element.group));
    // myArray.forEach(element => this.doughnutChartData.labels?.push(element.group))

  })

  this.buildingLogService.getBuildingLogReportTotal(newStart, newFecha).subscribe( data => {
    console.log(data)
    let info: number[] = [];
    let labels: string[] = [];
    let colors : string[] = [];
    data.registros.forEach( element => this.totalVisitas = this.totalVisitas +  element.count);
    data.registros.forEach( element => {
      info.push(element.count);
      labels.push(element.apellidos.trim() + ' ' + element.nombre.trim());
      colors.push(this.getRandomColor())
    })
    this.pieChartData.datasets.push({data: info, backgroundColor: colors});
    this.pieChartData.labels = labels;
    console.log(this.pieChartData)

     this.showChart = true;

    this.VOForm = this.fb.group({
    VORows: this.fb.array(data.registros.map(val => this.fb.group({
        medico: new FormControl(val.apellidos + ' ' + val.nombre),
        consultorio: new FormControl(val.descripcion_consultorio),
        cantidad: new FormControl(val.count)
        })
      )) //end of fb array
    }); // end of form group cretation
      // this.isLoading = false;
      this.dataSource = new MatTableDataSource((this.VOForm.get('VORows') as FormArray).controls);
  })


    // let start = this.form.value.start;
    // let end = this.form.value.end;
    // let newStart =  new Date(Date.UTC(new Date(start).getUTCFullYear(),new Date(start).getUTCMonth(),new Date(start).getUTCDate(),0,0,0)).toUTCString();;
    // let newFecha = new Date(Date.UTC(new Date(end).getUTCFullYear(),new Date(end).getUTCMonth(),new Date(end).getUTCDate(),23,59,59)).toUTCString();

    // this.daysCount = this.calculateDays(start, end)
    // console.log(this.daysCount)

    // this.cliqProceduresService.getPIByOR(newStart, newFecha).subscribe( data => {
    //   console.log(data)

    // this.proceduresForm = this.fb.group({
    //   operatingRoomsRows: this.fb.array(data.totalIncome.rows.map(val => this.fb.group({
    //         ingreso: new FormControl(val.Quirofano.nombre_quirofano),
    //         importe: new FormControl(val.total_income)
    //     })
    //   )) //end of fb array
    // }); // end of form group cretation
    //   // this.isLoading = false;
    //   console.log(this.proceduresForm)
    //   this.dataSource2 = new MatTableDataSource((this.proceduresForm.get('operatingRoomsRows') as FormArray).controls);
    // })
    // this.showIngresos = true;
  }

  campoEsValido(campo: string){
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }

  getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}




}

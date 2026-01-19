import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TableElement, TableExportUtil } from '@shared';
import { ProcedimientoCatalogo } from 'app/interfaces/CatalogoProcedimientos';
import { Total } from 'app/interfaces/Procedimiento';
import { BuildingLogService } from 'app/services/building-log.service';
import { CliqProceduresService } from 'app/services/cliq-procedures.service';
import { ProceduresCatalogService } from 'app/services/procedures-catalog.service';
import { Chart, ChartConfiguration, ChartData, ChartType, Color } from 'chart.js';
import { ApexAxisChartSeries, ApexNonAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexYAxis, ApexXAxis, ApexFill, ApexTooltip, ApexStroke, ApexLegend, ApexTitleSubtitle, ApexGrid, ApexMarkers, ApexResponsive } from 'ng-apexcharts';

interface proceduresTable {
  procedimiento:  string,
  total: number,
  month: string
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
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  totalGastos: number = 0
  totalIngresos: number = 0
  balance: number = 0
  showIngresos: boolean =  false;
  showTable: boolean =  false;

  totalIncome: number = 0;

  months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ]

  array:any []= [];

  proceduresByMonth:  proceduresTable[]= [];

  proceduresCatalog: ProcedimientoCatalogo[] = [];

  columns = ['Procedimiento','Mes','Cantidad'];
  columnsSearch = ['Mes','Cantidad'];

  data: any= []
  monthsColumns: string [] = ['Procedimiento','Acumulado','Enero','Febrero','Marzo','Abril', 'Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

  information: any[] = []
  total: number = 0;

  displayedColumns = [
    'mes',
    'ingresos',
  ];

  displayedColumnsByDates = ['Quirofano', 'Cantidad', 'Ingresos'];

  tableByDates: Total[]= [];

  dataSource = new MatTableDataSource<[string,string]>();

  constructor(public fb: FormBuilder, private _formBuilder: FormBuilder, private cliqProceduresService: CliqProceduresService,
                private buildingLogService: BuildingLogService, private cdr: ChangeDetectorRef, public proceduresCatalogService: ProceduresCatalogService
  ) {}

  form: FormGroup = this.fb.group({
        start:['', Validators.required],
        end:['', Validators.required]
      })

  formByProc: FormGroup = this.fb.group({
      startProc:['', Validators.required],
      endProc:['', Validators.required],
      procedimiento:['',Validators.required]
    })

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
    datasets: [],
  };

    public barChartOptions2: ChartConfiguration['options'] = {
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
    public barChartType2: ChartType = 'bar';
    public barChartPlugins2 = [];

    public barChartData2: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };


  ngOnInit() {

    // Acumulative

      this.cliqProceduresService.getAcumulativeProceduresReport().subscribe(data => {
        console.log(data)
        let groups: any = {};
        let groups2: any = [];

        for (let i = 0; i < data.final.length; i++) {
            let groupName = this.getMonth(data.final[i].month);
            if (!groups[groupName]) {
              groups[groupName] = [];
            }
            groups[groupName].push(data.final[i].info);
        }
          let myArray = [];

        for (let groupName in groups) {
          myArray.push({group: groupName, values: groups[groupName][0]});
        }
        console.log(myArray)
        // this.monthsColumns = myArray.map(element => element.group);
        console.log(this.monthsColumns)
        myArray.forEach( (element: { values: any[]; group: any; }) => {
        element.values.map(item => {
        let groupName = item['Catalogo_Procedimiento.nombre_procedimiento'];
        if (!groups2[groupName]) {
          groups2[groupName] = [];
        }
        groups2[groupName].push({
          month: element.group,
          count: item.count,
        });

        });
      });
        console.log(groups2)
        let names = Object.keys(groups2);
        console.log(names)


        this.data = names.map(element => {
          return {name: element, data: groups2[element]};
        });

        console.log(this.data)
        for(let index = 0; index < this.data.length; index++){
          let object = {
            procedure: this.data[index].name,
            acumulado: 0,
            enero: 0,
            febrero: 0,
            marzo: 0,
            abril:0,
            mayo: 0,
            junio: 0,
            julio: 0,
            agosto: 0,
            septiembre: 0,
            octubre: 0,
            noviembre: 0,
            diciembre: 0
          }
          for(let indexItem = 0; indexItem < this.months.length; indexItem++){
            if(this.data[index].data[indexItem] && this.data[index].data[indexItem].count){
              object.acumulado = object.acumulado + this.data[index].data[indexItem].count;
            }
            if(this.data[index].data[indexItem] && this.data[index].data[indexItem].month == 'Enero'){
                object.enero = this.data[index].data[indexItem].count;
            }
            if(this.data[index].data[indexItem] && this.data[index].data[indexItem].month == 'Febrero'){
                object.febrero = this.data[index].data[indexItem].count;
            }
            if(this.data[index].data[indexItem] && this.data[index].data[indexItem].month == 'Marzo'){
                object.marzo = this.data[index].data[indexItem].count;
            }
            if(this.data[index].data[indexItem] && this.data[index].data[indexItem].month == 'Abril'){
                object.abril = this.data[index].data[indexItem].count;
            }
            if(this.data[index].data[indexItem] && this.data[index].data[indexItem].month == 'Mayo'){
                object.mayo = this.data[index].data[indexItem].count;
            }
            if(this.data[index].data[indexItem] && this.data[index].data[indexItem].month == 'Junio'){
                object.junio = this.data[index].data[indexItem].count;
            }
            if(this.data[index].data[indexItem] && this.data[index].data[indexItem].month == 'Julio'){
                object.julio = this.data[index].data[indexItem].count;
            }
            if(this.data[index].data[indexItem] && this.data[index].data[indexItem].month == 'Agosto'){
                object.agosto = this.data[index].data[indexItem].count;
            }
            if(this.data[index].data[indexItem] && this.data[index].data[indexItem].month == 'Septiembre'){
                object.septiembre = this.data[index].data[indexItem].count;
            }
            if(this.data[index].data[indexItem] && this.data[index].data[indexItem].month == 'Octubre'){
                object.octubre = this.data[index].data[indexItem].count;
            }
            if(this.data[index].data[indexItem] && this.data[index].data[indexItem].month == 'Noviembre'){
                object.noviembre = this.data[index].data[indexItem].count;
            }
            if(this.data[index].data[indexItem] && this.data[index].data[indexItem].month == 'Diciembre'){
                object.diciembre = this.data[index].data[indexItem].count;
            }
          }
          this.array.push(object)
        }
      });

      this.proceduresCatalogService.getAllProceduresDetails().subscribe( data => {
        this.proceduresCatalog = data.catalogoProcedimiento.rows;
      })

    // Acumulative

    // this.cliqProceduresService.getTotalProceduresByDateGroupMonths('2025-02-01T07:00:00.000Z','2025-10-06T07:00:00.000Z').subscribe( data => {
    //   console.log(data)
    // })

    this.cliqProceduresService.getIncomesProceduresByMonth().subscribe( data => {
      data.result.forEach((element,index) => {
        this.total =  this.total + parseFloat(element[0].total_income);
        this.information.push({ month: this.months[index],income: element[0].total_income});
        this.dataSource = new MatTableDataSource(this.information);
      })
    });

    this.cliqProceduresService.getTotalIncomesByOR().subscribe(data => {
      let result = data.totalIncome.map( element => {
        return {income: element.total_income, operatingRoom: element.Quirofano.nombre_quirofano, id: element.id_quirofano}
      });

      let array: number[] = []
      this.barChartData.labels = result.map(element => element.operatingRoom);
      result.forEach( element => {
        array.push(parseFloat(element.income))
      })
      console.log(array)

      this.barChartData.datasets.push({
            data: array,
            backgroundColor: ['#007bff','#53b958','#909090','#03c5de'],
            label: 'Ingresos'
          })
           console.log(this.barChartData)
    })

    this.cliqProceduresService.getTotalCountByOR().subscribe(data => {
      console.log(data)
      let result = data.total.map( element => {
        return {total: element.count, operatingRoom: element.Quirofano.nombre_quirofano, id: element.id_quirofano}
      });
      let array: number[] = []
      this.barChartData2.labels = result.map(element => element.operatingRoom);
      result.forEach( element => {
        array.push(element.total)
      })
      console.log(array)
      this.barChartData2.datasets.push({
            data: array,
            backgroundColor: ['#007bff','#53b958','#909090','#03c5de'],
            label: 'No. Procedimientos'
          })
      console.log(this.barChartData2)
    })



  }

  search(){
    const start = this.form.value.start;
    const end = this.form.value.end;
    this.cliqProceduresService.getProceduresReportByDates(start,end).subscribe( data => {
      console.log(data)
      data.total.forEach(element => {
        this.totalIncome =  parseFloat(this.totalIncome + element.total_income);
      })
      this.tableByDates = data.total;
    })
  }

  getMonth(index: number){
    let months = ['Enero','Febrero','Marzo','Abril', 'Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    return months[index]
  }


    // dataSource = new MatTableDataSource<any>();
    // dataSource2 = new MatTableDataSource<any>();
    // daysCount: number = 0;

    // setHeader(title:any,index:any) {
    //   return title;
    // }

    // form: FormGroup = this.fb.group({
    //     start:['', Validators.required],
    //     end:['', Validators.required],
    //     procedimiento:['',Validators.required]
    //   })

    // displayedColumns: string[] = ['doctor', 'consultorio', 'cantidad'];

    // calculate(){
    //   console.log(this.VOForm.value)
    //   console.log(this.proceduresForm.value)

    //   this.totalGastos = this.VOForm.value.VORows.reduce((accumulator: any, currentValue: any) => {
    //     console.log(currentValue)
    //     if(currentValue.isDivisible){
    //       return accumulator + ((parseFloat(currentValue.importe) / 30 ) * this.daysCount)
    //     }
    //     return accumulator + parseFloat(currentValue.importe)
    //   },0);

    //   this.totalIngresos = this.proceduresForm.value.operatingRoomsRows.reduce((accumulator: any, currentValue: any) => {
    //     return accumulator + parseFloat(currentValue.importe)
    //   },0);
    //   console.log(this.totalGastos)
    //   this.balance = this.totalIngresos - this.totalGastos;
    //   // this.showBalance = true;
    // }





    // campoEsValido(campo: string){
    //   return this.form.controls[campo].errors && this.form.controls[campo].touched;
    // }

    searchByProc(){
      this.proceduresByMonth = [];
      let start = this.formByProc.value.startProc;
      let end = this.formByProc.value.endProc;
      let newStart =  new Date(Date.UTC(new Date(start).getUTCFullYear(),new Date(start).getUTCMonth(),new Date(start).getUTCDate(),0,0,0)).toUTCString();
      let newFecha = new Date(Date.UTC(new Date(end).getUTCFullYear(),new Date(end).getUTCMonth(),new Date(end).getUTCDate(),23,59,59)).toUTCString();

      console.log(newStart)

      let obj = {
        start: newStart,end: newFecha, procedimiento: this.formByProc.get('procedimiento')?.value
      }

      console.log(obj)

      this.cliqProceduresService.getTotalMonthProceduresByIdReport(obj).subscribe( data => {
        console.log(data)
        let final:any = [];
        data.result.forEach( (element) => {
          console.log(element)
          this.proceduresByMonth.push({
            procedimiento: element.total[0].Catalogo_Procedimiento.nombre_procedimiento,
            total: element.total[0].count,
            month:element.month,
          })
        })
        this.showTable = true;
        console.log(this.proceduresByMonth)
      });
    }


  exportExcel() {
      // key name with space add in brackets
      const exportData: any[] =
        this.tableByDates.map((x) => ({
          'Quirofano': x.Quirofano.nombre_quirofano,
          'Cantidad': x.count,
          'Ingresos': x.total_income
        }));
      TableExportUtil.exportToExcel(exportData, 'excel');
    }




}

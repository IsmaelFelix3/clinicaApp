import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CliqProceduresService } from 'app/services/cliq-procedures.service';
import { Chart, ChartConfiguration, ChartData, ChartType, Color } from 'chart.js';
import { ApexAxisChartSeries, ApexNonAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexYAxis, ApexXAxis, ApexFill, ApexTooltip, ApexStroke, ApexLegend, ApexTitleSubtitle, ApexGrid, ApexMarkers, ApexResponsive } from 'ng-apexcharts';

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



  months = ['Enero','Febrero','Marzo','Abril', 'Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  information: any[] = []
  total: number = 0;

  displayedColumns = [
    'mes',
    'ingresos',
  ];

  dataSource = new MatTableDataSource<[string,string]>();

  constructor(public cliqProceduresService: CliqProceduresService, public fb: FormBuilder) {}

  form: FormGroup = this.fb.group({
        start:['', Validators.required],
        end:['', Validators.required],
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

    this.cliqProceduresService.getTotalProceduresByDateGroupMonths('2025-02-01T07:00:00.000Z','2025-10-06T07:00:00.000Z').subscribe( data => {
      console.log(data)
    })

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


}

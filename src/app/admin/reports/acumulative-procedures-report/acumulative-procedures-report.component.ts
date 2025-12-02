import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ProcedimientoCatalogo } from 'app/interfaces/CatalogoProcedimientos';
import { BuildingLogService } from 'app/services/building-log.service';
import { CliqProceduresService } from 'app/services/cliq-procedures.service';
import { ProceduresCatalogService } from 'app/services/procedures-catalog.service';

interface proceduresTable {
  procedimiento:  string,
  total: number,
  month: string
}

@Component({
  selector: 'app-acumulative-procedures-report',
  templateUrl: './acumulative-procedures-report.component.html',
  styleUrls: ['./acumulative-procedures-report.component.scss']
})
export class AcumulativeProceduresReportComponent {

  totalGastos: number = 0
  totalIngresos: number = 0
  balance: number = 0
  showIngresos: boolean =  false;
  showTable: boolean =  false;

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

  constructor(private fb: FormBuilder,private _formBuilder: FormBuilder, private cliqProceduresService: CliqProceduresService,
              private buildingLogService: BuildingLogService, private cdr: ChangeDetectorRef, public proceduresCatalogService: ProceduresCatalogService ){}
  // VOForm!: FormGroup;
  // proceduresForm!: FormGroup;
  dataSource = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  daysCount: number = 0;

  setHeader(title:any,index:any) {
    return title;
  }

  form: FormGroup = this.fb.group({
      start:['', Validators.required],
      end:['', Validators.required],
      procedimiento:['',Validators.required]
    })

  ngOnInit(){

  // console.log(this.array)

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

  }

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



  getMonth(index: number){
    let months = ['Enero','Febrero','Marzo','Abril', 'Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    return months[index]
  }

  // campoEsValido(campo: string){
  //   return this.form.controls[campo].errors && this.form.controls[campo].touched;
  // }

  search(){
    this.proceduresByMonth = [];
    let start = this.form.value.start;
    let end = this.form.value.end;
    let newStart =  new Date(Date.UTC(new Date(start).getUTCFullYear(),new Date(start).getUTCMonth(),new Date(start).getUTCDate(),0,0,0)).toUTCString();
    let newFecha = new Date(Date.UTC(new Date(end).getUTCFullYear(),new Date(end).getUTCMonth(),new Date(end).getUTCDate(),23,59,59)).toUTCString();

    console.log(newStart)

    let obj = {
      start: newStart,end: newFecha, procedimiento: this.form.get('procedimiento')?.value
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





}


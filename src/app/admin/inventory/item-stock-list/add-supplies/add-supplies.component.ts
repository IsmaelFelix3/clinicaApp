import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Insumo } from 'app/interfaces/Insumo';
import { CliqProceduresService } from 'app/services/cliq-procedures.service';
import { Observable, startWith, map } from 'rxjs';
import { ItemStockListService } from '../item-stock-list.service';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';
import { Medico, MedicoShort } from 'app/interfaces/Medico.interface';
import { PacienteDropDown } from 'app/interfaces/Paciente.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-supplies',
  templateUrl: './add-supplies.component.html',
  styleUrls: ['./add-supplies.component.scss']
})
export class AddSuppliesComponent {

  
  doctors: MedicoShort[] = [];
  patients: PacienteDropDown[] = [];
  state: any;
  medico: string = '';
  paciente: string = '';
  quirofano: string = '';
  fecha: string = '';

  allDayProcedures: any = [];

  suppliesList: Insumo[] = [];
  myControl = new FormControl();
  options: string[] = [];
  selectedtableData: Insumo[] = [];
  dataSource!: MatTableDataSource<Insumo>;
  filteredOptions!: Observable<string[]>;
  idMedico: any;

  displayedColumns = [
    // 'id',
    'codigo',
    'descripcion',
    'cantidad',
  ];

  insumosForm!: FormGroup;

  procedureForm:FormGroup = this.fb.group({
    id_reserva: [,Validators.required],
    paciente: [,Validators.required],
    medico: [, Validators.required],
    fechaProcedimiento: [, Validators.required],
    horario: [,Validators.required], 
    quirofano: [, Validators.required],
    insumos: this.fb.array([])
  });


  constructor(private router: Router, private cliqProceduresService: CliqProceduresService, private insumosService: ItemStockListService,
              public fb: FormBuilder, public doctorService: DoctorsService ){
    this.state = this.router.getCurrentNavigation()?.extras.state;

    this.insumosForm = this.fb.group({
      tableRows: this.fb.array([],[Validators.required])
    }); 
    
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  get insumos() {
    return this.procedureForm.controls["insumos"] as FormArray
  }

  // addRow() {
  //   const control =  this.insumosForm.get('tableRows') as FormArray;
  //   control.push(this.createFormGroup());
  // }
  
  // createFormGroup(): FormGroup {
  //   return this.fb.group({
  //     codigo: ['',[Validators.required]],
  //     descripcion: ['',[Validators.required]],
  //     cantidad:[, Validators.required]
  //   });
  // }

  getProcedureInfo(){
    console.log(this.procedureForm.value.paciente)  
    this.quirofano = this.procedureForm.value.paciente.quirofano;
    this.fecha = this.procedureForm.value.paciente.fecha;
  }

  getPatients(){
    
    this.quirofano = '';
    this.fecha = '';
    this.idMedico = this.procedureForm.value.medico;
    
    let filtered = this.allDayProcedures.filter( (item: any) => item.group.split('/')[0] == this.idMedico );
    let procedures = filtered[0].data;

    let groups: any = {};

    let rows = procedures;
    for (let i = 0; i < rows.length; i++) {
      let groupName = rows[i].Paciente.nombre + ' ' + rows[i].Paciente.apellidos + '/' + rows[i].Paciente.id_paciente;
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(rows[i]);
    }

    let myArray = [];
    for (let groupName in groups) {
      myArray.push({ group: groupName, data: groups[groupName] });
    }
    console.log(myArray)

    this.patients = myArray.map( (item: any) => {
      return { nombre: item.group.split('/')[0], quirofano: item.data[0].Quirofano.nombre_quirofano, fecha: item.data[0].fecha_procedimiento , id_reserva: item.data[0].id_reserva }
    })


  }

  campoEsValido(campo: string){
    return this.procedureForm.controls[campo].errors && this.procedureForm.controls[campo].touched;
  }


  ngOnInit(): void {
    // if(this.state == undefined){
    //   this.router.navigateByUrl('admin/dashboard/main', {replaceUrl: true});
    // }

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    console.log(this.state)
    // this.cliqProceduresService.getProcedure(this.state.id).subscribe( data => {
    //   console.log(data);
    //   this.medico = data.procedimiento['Medico.nombre'] + ' ' + data.procedimiento['Medico.apellidos'];
    //   this.paciente = data.procedimiento['Paciente.nombre'] + ' ' + data.procedimiento['Paciente.apellidos'];
    //   this.quirofano = data.procedimiento['Quirofano.nombre_quirofano'];
    //   this.fecha = data.procedimiento.fecha_procedimiento.toString();
    // });

    this.insumosService.getAllItemStockLists().subscribe(data => {
      this.suppliesList = data.insumos.rows;
      this.options = data.insumos.rows.map( element => element.descripcion );
    });

    this.cliqProceduresService.getAllProceduresCurrentDay().subscribe( data => {
      console.log(data)
      let groups: any = {};

      let rows = data.procedimientos.rows;
      for (let i = 0; i < data.procedimientos.rows.length; i++) {
        let groupName = rows[i].Medico.nombre + ' ' + rows[i].Medico.apellidos + '/' + rows[i].Medico.id_medico;
        if (!groups[groupName]) {
          groups[groupName] = [];
        }
        groups[groupName].push(rows[i]);
      }

      for (let groupName in groups) {
        this.allDayProcedures.push({ group: groupName, data: groups[groupName] });
      }
      
      this.doctors = this.allDayProcedures.map( (item: any) => {
        return { nombre: item.group.split('/')[0], id_medico: item.group.split('/')[1]}
      })
    })

  }

  selectedOption(event: any) {
    const selectedValue = event.option.value;
    let selected = 0;
    let selectedvalueArr: any = this.suppliesList.find((e, index) => {
      if(e.descripcion == selectedValue){
        return e;
      }
      return undefined;
    });

    this.suppliesList.splice(selected,1);

    selectedvalueArr && this.selectedtableData.push(selectedvalueArr)
    this.dataSource = new MatTableDataSource(this.selectedtableData);
    console.log(this.selectedtableData)


    
  }

  private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }



  saveData(){
    Swal.fire('Insumo Agregados Exitosamente.');
    // console.log(this.selectedtableData)
    // let insumoForm = this.fb.group({
    //   codigo: [ this.selectedtableData[0].codigo, Validators.required ],
    //   descripcion: [ this.selectedtableData[0].descripcion, Validators.required],
    //   cantidad: [0, Validators.required]
    // });

    // console.log(insumoForm.value)
    // console.log(this.procedureForm.value)


    // this.procedureForm.value.insumos.forEach( (item: any, index: any) => {
    //   console.log(insumoForm.value.codigo, item.codigo)
    //   console.log('no entro')
    //   if(insumoForm.value.codigo != item.codigo || this.insumos.length == 0){
    //     console.log('entro')
    //     this.insumos.push(insumoForm);
    //   }
    // })
    


    // this.insumos.push(insumoForm);
    
    // console.log(this.procedureForm.value)
  }


}

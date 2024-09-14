import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CliqProceduresService } from 'app/services/cliq-procedures.service';
import { Medico } from '../../../interfaces/Procedimiento';
import { MatTableDataSource } from '@angular/material/table';
import { ItemStockListService } from 'app/admin/inventory/item-stock-list/item-stock-list.service';
import { Insumo } from 'app/interfaces/Insumo';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-add-supplies',
  templateUrl: './add-supplies.component.html',
  styleUrls: ['./add-supplies.component.scss'],
  providers: [ItemStockListService]
})
export class AddSuppliesComponent {

  state: any;
  medico: string = '';
  paciente: string = '';
  quirofano: string = '';
  nombreProcedimiento:  string = '';
  fecha: string = '';

  suppliesList: Insumo[] = [];
  myControl = new FormControl();
  options: string[] = [];
  selectedtableData: Insumo[] = [];
  dataSource!: MatTableDataSource<Insumo>;
  filteredOptions!: Observable<string[]>;

  displayedColumns = [
    // 'id',
    'codigo',
    'descripcion',
    'cantidad',
  ];

  insumosForm!: FormGroup;


  constructor(private router: Router, private cliqProceduresService: CliqProceduresService, private insumosService: ItemStockListService,
              public fb: FormBuilder ){
    this.state = this.router.getCurrentNavigation()?.extras.state;

    this.insumosForm = this.fb.group({
      tableRows: this.fb.array([],[Validators.required])
    }); 
    
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  addRow() {
    const control =  this.insumosForm.get('tableRows') as FormArray;
    control.push(this.createFormGroup());
  }
  
  createFormGroup(): FormGroup {
    return this.fb.group({
      codigo: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],
      cantidad:[, Validators.required]
    });
  }


  ngOnInit(): void {
    if(this.state == undefined){
      this.router.navigateByUrl('admin/dashboard/main', {replaceUrl: true});
    }

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.cliqProceduresService.getProcedure(this.state.id).subscribe( data => {
      console.log(data);
      this.medico = data.procedimiento['Medico.nombre'] + ' ' + data.procedimiento['Medico.apellidos'];
      this.paciente = data.procedimiento['Paciente.nombre'] + ' ' + data.procedimiento['Paciente.apellidos'];
      this.quirofano = data.procedimiento['Quirofano.nombre_quirofano'];
      this.nombreProcedimiento = data.procedimiento['Catalogo_Procedimiento.nombre_procedimiento'];
      this.fecha = data.procedimiento.fecha_procedimiento_inicio.toString();
    });

    this.insumosService.getAllItemStockLists().subscribe(data => {
      this.suppliesList = data.insumos.rows;
      this.options = data.insumos.rows.map( element => element.descripcion );
    })

  }

  selectedOption(event: any) {
    const selectedValue = event.option.value;

    let selectedvalueArr: any = this.suppliesList.find(e => e.descripcion == selectedValue);
    
    selectedvalueArr && this.selectedtableData.push(selectedvalueArr)
    console.log(this.selectedtableData)

    this.dataSource = new MatTableDataSource(this.selectedtableData);
    console.log(this.dataSource)
 }

  private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }



  saveData(){
    console.log(this.myControl)

    console.log(this.dataSource.data)
  }

}

import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CliqProceduresService } from 'app/services/cliq-procedures.service';
import { Medico } from '../../../interfaces/Procedimiento';
import { MatTableDataSource } from '@angular/material/table';
import { ItemStockListService } from 'app/admin/inventory/item-stock-list/item-stock-list.service';
import { HistorialInsumosProcedimiento, Insumo } from 'app/interfaces/Insumo';
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

  suppliesList: HistorialInsumosProcedimiento[] = [];
  myControl = new FormControl();
  options: string[] = [];
  selectedtableData: Insumo[] = [];
  dataSource!: MatTableDataSource<HistorialInsumosProcedimiento>;
  dataSourceSupplies!: MatTableDataSource<Insumo>;

  filteredOptions!: Observable<string[]>;

  dataLength: number = 0;

  displayedColumns = [
    'sku',
    'descripcion',
    'numeroLote',
    'fechaCaducidad',
    'cantidadActual'
  ];

  newItemsForm!: FormGroup;

  constructor(private router: Router, private cliqProceduresService: CliqProceduresService, 
              private insumosService: ItemStockListService, public fb: FormBuilder, 
              private cdr: ChangeDetectorRef ){
    this.state = this.router.getCurrentNavigation()?.extras.state;

    this.newItemsForm = this.fb.group({
      procedimiento: '',
      items: this.fb.array([])
    }); 
    
  }

  get items() : FormArray {
    return this.newItemsForm.get("items") as FormArray
  }
 
  newItem(): FormGroup {
    return this.fb.group({
      item: this.myControl,
      quantity: '',
    });
  }
 
  addItems() {
    this.items.push(this.newItem());
  }
 
  removeItem(i:number) {
    this.items.removeAt(i);
  }
 
  save() {
    console.log(this.newItemsForm.value);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    console.log(this.state)
    if(this.state == undefined){
      this.router.navigateByUrl('admin/dashboard/main', {replaceUrl: true});
    }

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    const id = this.state.id;

    this.newItemsForm.get('procedimiento')?.setValue(id);

    let procedure = '';

    if(id <= 9){
      procedure = 'PC-PRM0000' + id
    }
    else if(id >= 10 && id <= 99){
      procedure = 'PC-PRM000' + id
    }
    else if(id >= 100 && id <= 999){
      procedure = 'PC-PRM00' + id
    }
    else if(id >= 1000 && id <= 9999){
      procedure = 'PC-PRM0' + id
    }
    else if(id >= 10000 && id <= 99999){
      procedure = 'PC-PRM' + id
    }

    this.cliqProceduresService.getProcedure(this.state.id).subscribe( data => {
      this.medico = data.procedimiento['Medico.nombre'] + ' ' + data.procedimiento['Medico.apellidos'];
      this.paciente = data.procedimiento['Paciente.nombre'] + ' ' + data.procedimiento['Paciente.apellidos'];
      this.quirofano = data.procedimiento['Quirofano.nombre_quirofano'];
      this.nombreProcedimiento = data.procedimiento['Catalogo_Procedimiento.nombre_procedimiento'];
      this.fecha = data.procedimiento.fecha_procedimiento_inicio.toString();
    });

    this.insumosService.getAllItemStockLists().subscribe( data => {
      this.options = data.insumos.rows.map( item => item.sku + ' - ' + item.descripcion )
    });

    this.insumosService.getAllItemsByProcedure(procedure).subscribe(data => {
      this.suppliesList = data.historialInsumosProcedimiento;
      this.dataSource = new MatTableDataSource(this.suppliesList);
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataLength = this.suppliesList.length;
      // this.options = data.insumos.rows.map( element => element.descripcion );
    })

  }

  selectedOption(event: any) {
    console.log(event.option.value)
    // const selectedValue = event.option.value;

    // let selectedvalueArr: any = this.suppliesList.find(e => e.descripcion == selectedValue);
    
    // selectedvalueArr && this.selectedtableData.push(selectedvalueArr)
    // console.log(this.selectedtableData)

    // this.dataSource = new MatTableDataSource(this.selectedtableData);
    // console.log(this.dataSource)
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

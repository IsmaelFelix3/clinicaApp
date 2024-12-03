import { Component, Inject } from '@angular/core';
import {  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormGroup,
  FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Insumo } from 'app/interfaces/Insumo';
import Swal from 'sweetalert2';
import { FormDialogComponent } from '../issued-items/dialog/form-dialog/form-dialog.component';
import { ItemStockList } from '../item-stock-list/item-stock-list.model';
import { ItemStockListService } from '../item-stock-list/item-stock-list.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-item-stock',
  templateUrl: './item-stock.component.html',
  styleUrls: ['./item-stock.component.scss']
})
export class ItemStockComponent {

  dialogTitle: string;
  itemStockListForm: FormGroup;
  itemStockList: ItemStockList[] = [];
  labs: any;
  suppliers: any;

  item!: Insumo;
  showFechaCaducidad: boolean = false;

  constructor(public itemStockListService: ItemStockListService, private fb: FormBuilder){
    // Set the defaults
    this.dialogTitle = 'Nuevo Insumo';
    const blankObject = {} as ItemStockList;
    this.item = new ItemStockList(blankObject);
    this.itemStockListForm = this.createContactForm();

  }

  createContactForm(): FormGroup {
    return this.fb.group({
      sku: [ this.item.sku, Validators.required ],
      descripcion: [ this.item.descripcion, Validators.required ],
      estado: [ this.item.estado, Validators.required ],
      numeroFacturaCompra: [],
      numeroLote: [],
      fechaCaducidad: [],
      cantidadMinima: [ this.item.cantidadMinima, Validators.required ],
      cantidadMaxima: [ this.item.cantidadMaxima, Validators.required ],
      cantidadActual: [ this.item.cantidadActual, Validators.required ],
      laboratorio: [],
      dosis: [],
      fechaFactura: [ this.item.fechaFactura, Validators.required ],
      codigoBarras: [],
      proveedor: [],
      nombreComercial: [],
      modelo: [],
      clasificacion: [],
      nombreProducto: [],
      categoria: [],
      marca: [],
      moneda: [],
      unidadMedida: [],
      precioVenta: [],
      costo: [],
      codigoSat: [],
      tasaImpuesto: [],
      // Informacion Farmaceutica
      nombreIngredienteActivo: [],
      denominacionGenericaProd: [],
      denominacionDistintivaProd: [],
      datosFabricante: [],
      formaFarmaceutica: [],
      fechaAlta: [ , Validators.required ],
    });
  }


  campoEsValido(campo: string){
    return this.itemStockListForm.controls[campo].errors && this.itemStockListForm.controls[campo].touched;
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday and days before from being selected.
    return day !== 0 && day !== 6 && d! > new Date();
  };

  myFilter2 = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday and days before from being selected.
    return day !== 0 && day !== 6 && d! > new Date();
  };

  cleanDate(){
    this.itemStockListForm.get('fechaFacturaCompra')?.reset();
    // this.isVisible = false;
  }

  onDateChange(event: any) {
  }
  

  confirmEdit(){
    if(!this.itemStockListForm.valid){
      this.itemStockListForm.markAllAsTouched();
      return;
    }

    const codigo = this.itemStockListForm.get('codigo')?.value.toUpperCase();
    const descripcion = this.itemStockListForm.get('descripcion')?.value.toUpperCase();
    this.itemStockListForm.get('codigo')?.setValue(codigo)
    this.itemStockListForm.get('descripcion')?.setValue(descripcion)

    this.itemStockListService.updateItem(this.itemStockListForm.getRawValue()).subscribe({
      complete: () => {
        Swal.fire('Insumo editado exitosamente.');
      },
      error: (err) => {
        Swal.fire({icon: 'error',title:'Error al editar el insumo', text: err.msg});
      },
    });
  }

  public confirmAdd(): void {

    if(!this.itemStockListForm.valid){
      this.itemStockListForm.markAllAsTouched();
      return;
    }

    const codigo = this.itemStockListForm.get('codigo')?.value.toUpperCase();
    const descripcion = this.itemStockListForm.get('descripcion')?.value.toUpperCase();
    this.itemStockListForm.get('codigo')?.setValue(codigo)
    this.itemStockListForm.get('descripcion')?.setValue(descripcion)

    this.itemStockListService.addItem(this.itemStockListForm.getRawValue()).subscribe({
      complete: () => {
        Swal.fire('Insumo creado exitosamente.');
      },
      error: (err) => {
        Swal.fire({icon: 'error',title:'Error al registrar insumo', text: err.msg});
      },
    });

  }

}

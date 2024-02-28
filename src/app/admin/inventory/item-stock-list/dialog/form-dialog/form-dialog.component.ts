import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ItemStockListService } from '../../item-stock-list.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ItemStockList } from '../../item-stock-list.model';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { Insumo } from 'app/interfaces/Insumo';

export interface DialogData {
  id: number;
  action: string;
  item: Insumo;
}

@Component({
  selector: 'app-form-dialog:not(h)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {

  action: string;
  dialogTitle: string;
  // itemStockListForm: UntypedFormGroup;
  // itemStockList: ItemStockList;

  item!: Insumo;

  itemForm: FormGroup = this.fb.group({
    codigo: [, Validators.required],
    descripcion: [, Validators.required],
    estado: [true, Validators.required],
    fechaAlta: [ new Date().toISOString(), Validators.required]
  });

  constructor( public dialogRef: MatDialogRef<FormDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
               public itemStockListService: ItemStockListService, private fb: FormBuilder){
    console.log(data)
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.item.codigo;
      this.item = data.item;
      this.itemForm = this.createContactForm();
    } 
    else {
      this.dialogTitle = 'Nuevo Insumo';
      const blankObject = {} as ItemStockList;
      // this.item = new ItemStockList(blankObject);
    }
    //  this.itemStockListForm = this.createContactForm();

  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id_insumo: [this.item.id_insumo, Validators.required],
      codigo: [this.item.codigo, Validators.required],
      descripcion: [this.item.descripcion, Validators.required],
      estado: [this.item.estado, Validators.required],
      fechaAlta: [ this.item.createdAt, [Validators.required],],
    });
  }

  campoEsValido(campo: string){
    return this.itemForm.controls[campo].errors && this.itemForm.controls[campo].touched;
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmEdit(){
    if(!this.itemForm.valid){
      this.itemForm.markAllAsTouched();
      return;
    }

    const codigo = this.itemForm.get('codigo')?.value.toUpperCase();
    const descripcion = this.itemForm.get('descripcion')?.value.toUpperCase();
    this.itemForm.get('codigo')?.setValue(codigo)
    this.itemForm.get('descripcion')?.setValue(descripcion)

    this.itemStockListService.updateItem(this.itemForm.getRawValue()).subscribe({
      complete: () => {
        Swal.fire('Insumo editado exitosamente.');
      },
      error: (err) => {
        Swal.fire({icon: 'error',title:'Error al editar el insumo', text: err.msg});
      },
    });
  }

  public confirmAdd(): void {

    if(!this.itemForm.valid){
      this.itemForm.markAllAsTouched();
      return;
    }

    const codigo = this.itemForm.get('codigo')?.value.toUpperCase();
    const descripcion = this.itemForm.get('descripcion')?.value.toUpperCase();
    this.itemForm.get('codigo')?.setValue(codigo)
    this.itemForm.get('descripcion')?.setValue(descripcion)

    this.itemStockListService.addItem(this.itemForm.getRawValue()).subscribe({
      complete: () => {
        Swal.fire('Insumo creado exitosamente.');
      },
      error: (err) => {
        Swal.fire({icon: 'error',title:'Error al registrar insumo', text: err.msg});
      },
    });
  }
}

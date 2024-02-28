import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Insumo } from 'app/interfaces/Insumo';
import { ItemStockListService } from '../item-stock-list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent {

  state: any;

  item!: Insumo;

  estados: any[] = [
    { name: 'Activo', value: true },
    { name: 'Desactivado', value: false }
  ];

  itemForm: FormGroup = this.fb.group({
    codigo: [, Validators.required],
    descripcion: [, Validators.required],
    estado: [, Validators.required],
    fechaAlta: [ new Date().toISOString(), Validators.required]
  });


  constructor( private router: Router, private fb: FormBuilder, private itemStockListService: ItemStockListService ){
    this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    if(this.state == undefined){
      this.router.navigateByUrl('admin/inventory/item-stock-list');
      return;
    }
    console.log(this.state.row)
    this.itemForm.get('codigo')?.setValue(this.state.row.codigo);
    this.itemForm.get('descripcion')?.setValue(this.state.row.descripcion);
    this.itemForm.get('estado')?.setValue(this.state.row.estado);
    this.itemForm.get('fechaAlta')?.setValue(new Date(this.state.row.createdAt).toLocaleDateString());
  }

  campoEsValido(campo: string){
    return this.itemForm.controls[campo].errors && this.itemForm.controls[campo].touched;
  }

  editarItem(){
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
        this.router.navigateByUrl('admin/inventory/item-stock-list');
      },
      error: (err) => {
        Swal.fire({icon: 'error',title:'Error al editar el insumo', text: err.msg});
      },
    });
  }

  delete(){
    const nombreInsumo = this.state.row.descripcion;
    Swal.fire({
      title: `¿Esta seguro que desea eliminar el insumo ${nombreInsumo}?`,
      showDenyButton: true,
      confirmButtonText: 'Continuar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.itemStockListService.deleteItemStockList(this.state.row.id_insumo).subscribe({
          complete: () => {
            this.router.navigateByUrl('admin/inventory/item-stock-list');
          },
          next: (value) => {
            Swal.fire({icon: 'success',title:'Se elimino el insumo correctamente.'});
          },
          error: (error) => {
            Swal.fire({icon: 'error',title:'Error al eliminar el insumo', text: error.msg});
          }
        });
      }
    })
  }

  return(){
    this.router.navigateByUrl('admin/inventory/item-stock-list');
  }

}

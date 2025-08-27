import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BankService } from 'app/services/bank.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-bank',
  templateUrl: './edit-bank.component.html',
  styleUrls: ['./edit-bank.component.scss']
})
export class EditBankComponent {

  bankForm: FormGroup = this.fb.group({
    id_banco: [, [Validators.required]],
    nombre_banco: [, [Validators.required]],
  });
  state: any = {}

  constructor(private fb: FormBuilder, private router: Router, public bankService: BankService ){
    this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(){
      if(this.state == undefined){
      this.router.navigateByUrl('admin/accounting/banksCatalog');
      return;
    }
    console.log(this.state)
    this.bankService.getBankById(this.state.id).subscribe( data => {
      console.log(data)
      this.bankForm.get('id_banco')?.setValue(data.banco.id_banco);
      this.bankForm.get('nombre_banco')?.setValue(data.banco.nombre_banco);
    });
  }

  campoEsValido(campo: string){
    return (this.bankForm.controls[campo].errors && this.bankForm.controls[campo].touched);
  }

  editProcedure() {
    if(!this.bankForm.valid){
      this.bankForm.markAllAsTouched();
      return;
    }

    this.bankForm.get('nombre_banco')?.setValue(this.bankForm.value.nombre_banco.toUpperCase());
    this.bankService.editBank(this.bankForm.value).subscribe({
      complete: () => {
        this.router.navigateByUrl('admin/accounting/banksCatalog');
      },
      next: (value) => {
        console.log(value)
        Swal.fire({icon: 'success',title:'Banco editado correctamente'});
      },
      error: (error) => {
        Swal.fire({icon: 'error',title:'Error al editar el banco', text: error.msg});
      }
    })
  }

  return(){
  this.router.navigateByUrl('admin/accounting/banksCatalog');
  }



}

import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BankService } from 'app/services/bank.service';
import { SpecialtiesService } from 'app/services/specialties.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.scss']
})
export class AddBankComponent {

  bankForm: FormGroup = this.fb.group({
    nombre_banco: [, [Validators.required]],
  });

  constructor(private fb: FormBuilder, private router: Router, public bankService: BankService ){}

  campoEsValido(campo: string){
    return (this.bankForm.controls[campo].errors && this.bankForm.controls[campo].touched);
  }

  addProcedure() {
    if(!this.bankForm.valid){
      this.bankForm.markAllAsTouched();
      return;
    }

    this.bankForm.get('nombre_banco')?.setValue(this.bankForm.value.nombre_banco.toUpperCase());
    this.bankService.addBank(this.bankForm.value).subscribe({
      complete: () => {
        this.router.navigateByUrl('admin/accounting/banksCatalog');
      },
      next: (value) => {
        console.log(value)
        Swal.fire({icon: 'success',title:'Banco se guardo correctamente'});
      },
      error: (error) => {
        Swal.fire({icon: 'error',title:'Error al guardar el banco', text: error.msg});
      }
    })
  }

    return(){
    this.router.navigateByUrl('admin/accounting/banksCatalog');
  }

}

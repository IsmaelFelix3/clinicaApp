import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentMethodService } from 'app/services/payment-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.scss']
})
export class AddPaymentMethodComponent {

  paymentMethodForm: FormGroup = this.fb.group({
    nombre_forma_pago: [, [Validators.required]],
  });

  constructor(private fb: FormBuilder, private router: Router, public paymentMethodService: PaymentMethodService ){}

  campoEsValido(campo: string){
    return (this.paymentMethodForm.controls[campo].errors && this.paymentMethodForm.controls[campo].touched);
  }

  addProcedure() {
    if(!this.paymentMethodForm.valid){
      this.paymentMethodForm.markAllAsTouched();
      return;
    }

    this.paymentMethodForm.get('nombre_forma_pago')?.setValue(this.paymentMethodForm.value.nombre_forma_pago.toUpperCase());
    this.paymentMethodService.addPaymentMethod(this.paymentMethodForm.value).subscribe({
      complete: () => {
        this.router.navigateByUrl('admin/accounting/paymentMethodsCatalog');
      },
      next: (value) => {
        console.log(value)
        Swal.fire({icon: 'success',title:'Forma de pago se guardo correctamente'});
      },
      error: (error) => {
        Swal.fire({icon: 'error',title:'Error al guardar la forma de pago', text: error.msg});
      }
    })
  }

  return(){
    this.router.navigateByUrl('admin/accounting/paymentMethodsCatalog');
  }


}

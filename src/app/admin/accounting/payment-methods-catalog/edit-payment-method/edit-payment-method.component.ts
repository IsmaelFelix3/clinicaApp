import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentMethodService } from 'app/services/payment-method.service';
import { SpecialtiesService } from 'app/services/specialties.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-payment-method',
  templateUrl: './edit-payment-method.component.html',
  styleUrls: ['./edit-payment-method.component.scss']
})
export class EditPaymentMethodComponent {

  paymentMethodForm: FormGroup = this.fb.group({
    id_forma_pago: [, [Validators.required]],
    nombre_forma_pago: [, [Validators.required]],
  });
  state: any = {}

  constructor(private fb: FormBuilder, private router: Router, public paymentMethodService: PaymentMethodService ){
    this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(){
      if(this.state == undefined){
      this.router.navigateByUrl('admin/accounting/paymentMethodsCatalog');
      return;
    }
    this.paymentMethodService.getPaymentMethodById(this.state.id).subscribe( data => {
      console.log(data)
      this.paymentMethodForm.get('id_forma_pago')?.setValue(data.formaPago.id_forma_pago);
      this.paymentMethodForm.get('nombre_forma_pago')?.setValue(data.formaPago.nombre_forma_pago);
    });
  }

  campoEsValido(campo: string){
    return (this.paymentMethodForm.controls[campo].errors && this.paymentMethodForm.controls[campo].touched);
  }

  editProcedure() {
    if(!this.paymentMethodForm.valid){
      this.paymentMethodForm.markAllAsTouched();
      return;
    }

    this.paymentMethodForm.get('nombre_forma_pago')?.setValue(this.paymentMethodForm.value.nombre_forma_pago.toUpperCase());
    this.paymentMethodService.editPaymentMethod(this.paymentMethodForm.value).subscribe({
      complete: () => {
        this.router.navigateByUrl('admin/accounting/paymentMethodsCatalog');
      },
      next: (value) => {
        console.log(value)
        Swal.fire({icon: 'success',title:'La especialidad editada correctamente'});
      },
      error: (error) => {
        Swal.fire({icon: 'error',title:'Error al editar la especialidad', text: error.msg});
      }
    })
  }

  return(){
    this.router.navigateByUrl('admin/accounting/paymentMethodsCatalog');
  }


}

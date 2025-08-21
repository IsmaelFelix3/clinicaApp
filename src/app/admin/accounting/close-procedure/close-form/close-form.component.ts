import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Banco } from 'app/interfaces/Banco';
import { FormaPago } from 'app/interfaces/FormaPago';
import { Quirofano } from 'app/interfaces/Procedimiento';
import { ClosedProcedureInformation } from 'app/interfaces/ProcedimientoContabilidad';
import { BankService } from 'app/services/bank.service';
import { CliqProceduresService } from 'app/services/cliq-procedures.service';
import { PaymentMethodService } from 'app/services/payment-method.service';

import { QuirofanosService } from 'app/services/quirofanos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-close-form',
  templateUrl: './close-form.component.html',
  styleUrls: ['./close-form.component.scss']
})
export class CloseFormComponent {
  state: any = {};
  quirofanos: Quirofano[] = [];
  bancos: Banco[] = [];
  formasPago: FormaPago[] = [];

  procedureForm:FormGroup = this.fb.group({
      serie: [, Validators.required],
      paciente: [,Validators.required],
      medico: [, Validators.required],
      fechaProcedimiento: [, Validators.required],
      quirofano: [, Validators.required],
      costo: [, Validators.required],
      banco: [, Validators.required],
      formaPago: [, Validators.required],
      procedimiento: [, Validators.required]
    });

  constructor(private router: Router, public fb: FormBuilder, private quirofanosService: QuirofanosService, private bankService: BankService,
              private paymentMethodService: PaymentMethodService, private cliqProcedureService: CliqProceduresService){
    this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(){
    console.log(this.state)
    if(this.state == undefined){
      this.router.navigateByUrl('admin/accounting/closeProcedure');
      return;
    }
    this.quirofanosService.getQuirofanos().subscribe(quirofanos => { this.quirofanos = quirofanos.quirofanos.rows; });
    this.bankService.getBanks().subscribe( banks => { this.bancos =  banks.bancos.rows; });
    this.paymentMethodService.getPaymentMethods().subscribe( paymentMethods => { this.formasPago = paymentMethods.formasPago.rows; })

    this.procedureForm.setValue({
      serie: this.state.serie,
      paciente: this.state.Paciente.nombre + ' ' + this.state.Paciente.apellidos,
      medico: this.state.Medico.nombre + ' ' + this.state.Medico.apellidos,
      fechaProcedimiento: this.state.fecha_procedimiento_inicio,
      quirofano: this.state.Quirofano.id_quirofano,
      costo: this.state.costo,
      banco: this.state.Catalogo_Banco.id_banco,
      formaPago: this.state.Catalogo_Forma_Pago.id_forma_pago,
      procedimiento: this.state.Catalogo_Procedimiento.nombre_procedimiento
    });
    console.log(this.procedureForm.value)

    this.procedureForm.get('serie')?.disable();
    this.procedureForm.get('medico')?.disable();
    this.procedureForm.get('paciente')?.disable();
    this.procedureForm.get('fechaProcedimiento')?.disable();
    this.procedureForm.get('procedimiento')?.disable();

  }

  numberOnly(event: KeyboardEvent){
    const charCode = (event.code);
    if (charCode.substring(0,5) !== 'Digit' && charCode.substring(0,6) !== 'Period' ) {
      return false;
    }
    return true;
  }

  campoEsValido(campo: string){
    return this.procedureForm.controls[campo].errors && this.procedureForm.controls[campo].touched;
  }

  closeProcedure(){
     if(!this.procedureForm.valid){
      this.procedureForm.markAllAsTouched();
      return;
    }
    console.log(this.procedureForm)

    let closedProcedure = {
      costo: this.procedureForm.value.costo,
      id_reserva: this.state.id_reserva,
      id_banco: this.procedureForm.value.banco,
      id_quirofano: this.procedureForm.value.quirofano,
      id_forma_pago: this.procedureForm.value.formaPago,
    }

    this.cliqProcedureService.postAccountingProcedure(closedProcedure).subscribe({
       complete: () => {
              this.procedureForm.reset();
              Swal.fire('Guardado con exito');
              this.router.navigateByUrl('admin/accounting/closeProcedure');
            },
            error: (data) => {
              console.log(data);
              Swal.fire({icon: 'error',title:'Error al guardar la información', text: data.msg});
            },
    })
  }

}

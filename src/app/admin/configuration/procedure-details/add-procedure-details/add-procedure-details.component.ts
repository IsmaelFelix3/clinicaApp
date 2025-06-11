import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Quirofano } from 'app/interfaces/Procedimiento';
import { ProceduresCatalogService } from 'app/services/procedures-catalog.service';
import { QuirofanosService } from 'app/services/quirofanos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-procedure-details',
  templateUrl: './add-procedure-details.component.html',
  styleUrls: ['./add-procedure-details.component.scss']
})
export class AddProcedureDetailsComponent {

  quirofanos: Quirofano[] = [];

  procedureDetailsForm: FormGroup = this.fb.group({
    nombre_procedimiento: [, [Validators.required]],
    especialidad: [, [Validators.required]],
    precioBase: [, [Validators.required]],
    quirofano: [, [Validators.required]],
});
  constructor(private fb: FormBuilder, private router: Router, public proceduresCatalog: ProceduresCatalogService, public quirofanosService: QuirofanosService){}

  ngOnInit(): void {
      this.quirofanosService.getQuirofanos().subscribe(quirofanos => {
      this.quirofanos = quirofanos.quirofanos.rows;
    });

  }

  campoEsValido(campo: string){
    return (this.procedureDetailsForm.controls[campo].errors && this.procedureDetailsForm.controls[campo].touched);
  }

  addProcedure() {
    console.log('Form Value', this.procedureDetailsForm.value);
    // console.log('Form Value', this.procedureDetailsForm);
    if(!this.procedureDetailsForm.valid){
      this.procedureDetailsForm.markAllAsTouched();
      return;
    }
    this.proceduresCatalog.addProcedureConfigurationDetails(this.procedureDetailsForm.value).subscribe({
      complete: () => {
        this.router.navigateByUrl('admin/configuration/procedureDetails');
      },
      next: (value) => {
        Swal.fire({icon: 'success',title:'Se guardo correctamente'});
      },
      error: (error) => {
        Swal.fire({icon: 'error',title:'Error al editar el procedimiento', text: error.msg});
      }
    })
  }

    return(){
    this.router.navigateByUrl('admin/configuration/procedureDetails');
  }

}

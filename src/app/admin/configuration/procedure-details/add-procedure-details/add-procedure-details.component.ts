import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialidad } from 'app/interfaces/Especialidad';
import { ProceduresCatalogService } from 'app/services/procedures-catalog.service';
import { SpecialtiesService } from 'app/services/specialties.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-procedure-details',
  templateUrl: './add-procedure-details.component.html',
  styleUrls: ['./add-procedure-details.component.scss']
})
export class AddProcedureDetailsComponent {

  specialties: Especialidad[] = [];

  procedureDetailsForm: FormGroup = this.fb.group({
    nombre_procedimiento: [, [Validators.required]],
    especialidad: [, [Validators.required]],
    folio: [, [Validators.required]]
  });

  constructor(private fb: FormBuilder, private router: Router, public proceduresCatalog: ProceduresCatalogService, public specialtiesService: SpecialtiesService ){}

  ngOnInit(): void {
    this.specialtiesService.getSpecialties().subscribe( data => this.specialties =  data.specialties.rows);
  }

  campoEsValido(campo: string){
    return (this.procedureDetailsForm.controls[campo].errors && this.procedureDetailsForm.controls[campo].touched);
  }

  addProcedure() {
    if(!this.procedureDetailsForm.valid){
      this.procedureDetailsForm.markAllAsTouched();
      return;
    }
    this.proceduresCatalog.addProcedureConfigurationDetails(this.procedureDetailsForm.value).subscribe({
      complete: () => {
        this.router.navigateByUrl('admin/configuration/procedureDetails');
      },
      next: (value) => {
        console.log(value)
        Swal.fire({icon: 'success',title:'Se guardo el procedimiento correctamente'});
      },
      error: (error) => {
        Swal.fire({icon: 'error',title:'Error al guardar el procedimiento', text: error.msg});
      }
    })
  }

    return(){
    this.router.navigateByUrl('admin/configuration/procedureDetails');
  }

}

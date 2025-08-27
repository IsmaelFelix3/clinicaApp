import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialidad } from 'app/interfaces/Especialidad';
import { ProceduresCatalogService } from 'app/services/procedures-catalog.service';
import { SpecialtiesService } from 'app/services/specialties.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-specialty',
  templateUrl: './add-specialty.component.html',
  styleUrls: ['./add-specialty.component.scss']
})
export class AddSpecialtyComponent {

  specialtyForm: FormGroup = this.fb.group({
    nombre_especialidad: [, [Validators.required]],
  });

  constructor(private fb: FormBuilder, private router: Router, public specialtiesService: SpecialtiesService ){}

  campoEsValido(campo: string){
    return (this.specialtyForm.controls[campo].errors && this.specialtyForm.controls[campo].touched);
  }

  addProcedure() {
    if(!this.specialtyForm.valid){
      this.specialtyForm.markAllAsTouched();
      return;
    }

    this.specialtyForm.get('nombre_especialidad')?.setValue(this.specialtyForm.value.nombre_especialidad.toUpperCase());
    this.specialtiesService.addSpecialty(this.specialtyForm.value).subscribe({
      complete: () => {
        this.router.navigateByUrl('admin/configuration/specialtiesCtl');
      },
      next: (value) => {
        console.log(value)
        Swal.fire({icon: 'success',title:'La especialidad se guardo correctamente'});
      },
      error: (error) => {
        Swal.fire({icon: 'error',title:'Error al guardar la especialidad', text: error.msg});
      }
    })
  }

    return(){
    this.router.navigateByUrl('admin/configuration/specialtiesCtl');
  }

}

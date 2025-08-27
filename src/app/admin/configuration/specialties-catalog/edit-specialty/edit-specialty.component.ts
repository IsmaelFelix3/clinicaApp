import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialidad } from 'app/interfaces/Especialidad';
import { SpecialtiesService } from 'app/services/specialties.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-specialty',
  templateUrl: './edit-specialty.component.html',
  styleUrls: ['./edit-specialty.component.scss']
})
export class EditSpecialtyComponent {

  specialtyForm: FormGroup = this.fb.group({
    id_especialidad: [, [Validators.required]],
    nombre_especialidad: [, [Validators.required]],
  });
  state: any = {}

  constructor(private fb: FormBuilder, private router: Router, public specialtiesService: SpecialtiesService ){
    this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(){
      if(this.state == undefined){
      this.router.navigateByUrl('admin/configuration/specialtiesCtl');
      return;
    }
    console.log(this.state)
    this.specialtiesService.getSpecialty(this.state.id).subscribe( data => {
      console.log(data)
      this.specialtyForm.get('id_especialidad')?.setValue(data.specialty.id_especialidad);
      this.specialtyForm.get('nombre_especialidad')?.setValue(data.specialty.nombre_especialidad);
    });
    console.log(this.specialtyForm.value)
  }

  campoEsValido(campo: string){
    return (this.specialtyForm.controls[campo].errors && this.specialtyForm.controls[campo].touched);
  }

  editProcedure() {
    if(!this.specialtyForm.valid){
      this.specialtyForm.markAllAsTouched();
      return;
    }

    this.specialtyForm.get('nombre_especialidad')?.setValue(this.specialtyForm.value.nombre_especialidad.toUpperCase());
    this.specialtiesService.editSpecialty(this.specialtyForm.value).subscribe({
      complete: () => {
        this.router.navigateByUrl('admin/configuration/specialtiesCtl');
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
    this.router.navigateByUrl('admin/configuration/specialtiesCtl');
  }


}

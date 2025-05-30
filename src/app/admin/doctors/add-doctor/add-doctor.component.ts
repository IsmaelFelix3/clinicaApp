import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { DoctorsService } from '../alldoctors/doctors.service';
import Swal from 'sweetalert2';
import { Router, Event } from '@angular/router';
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss'],
})
export class AddDoctorComponent {
    doctorForm: FormGroup = this.fb.group({
      nombre: [, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      apellidos: [, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      telefono: [, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      password: ['Admin123'],
      especialidad: [, [Validators.required]],
      cedula: [, [Validators.required]],
      permiso_secre_salud: [, [Validators.required]],
      correo: [, [Validators.required, Validators.email, Validators.minLength(5)]],
      id_edificio: [, [Validators.required]],
      id_piso: [,[Validators.required]],
      consultorio: [,[Validators.required]],
      google: [false],
      rol: ['Medico'],
      fecha_registro: [new Date().toISOString()]
  });

  constructor(private fb: FormBuilder, public doctorsService: DoctorsService, public router: Router){}

  onSubmit() {
    if(!this.doctorForm.valid){
      this.doctorForm.markAllAsTouched();
      return;
    }
    console.log('Form Value', this.doctorForm);
    this.doctorsService.addDoctor(this.doctorForm.value).subscribe({
      complete: () => {
        this.router.navigateByUrl('admin/doctors/allDoctors')
      },
      next: (value) => {
        Swal.fire({icon: 'success',title:'Se guardo medico con exito'});
      },
      error: (data) => {
        Swal.fire({icon: 'error',title:'Error al registrar la cita', text: data.msg});
      },
    })
  }
  
  campoEsValido(campo: string){
    return (this.doctorForm.controls[campo].errors && this.doctorForm.controls[campo].touched);
  }
}

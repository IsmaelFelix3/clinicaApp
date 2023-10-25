import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss'],
})
export class EditDoctorComponent {
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
  constructor(private fb: FormBuilder) {
  }
  onSubmit() {
    console.log('Form Value', this.doctorForm.value);
  }

  campoEsValido(campo: string){
    return (this.doctorForm.controls[campo].errors && this.doctorForm.controls[campo].touched);
  }
  
}

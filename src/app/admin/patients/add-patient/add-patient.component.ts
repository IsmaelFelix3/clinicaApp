import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PatientsService } from 'app/doctor/patients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent {
  patientForm: FormGroup;
  constructor(private fb: FormBuilder, private patientService: PatientsService, private router: Router) {
    this.patientForm = this.fb.group({
      nombre: [, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      apellidos: [,[Validators.required, Validators.pattern('[a-zA-Z]+')]],
      fecha_nacimiento: [, [Validators.required]],
      genero: [, [Validators.required]],
      correo: [, 
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      telefono: [, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      google: [false],
      rol: ['Paciente'],
      password: ['Admin123'],
      fecha_registro: [new Date().toISOString()]
    });
  }
  guardarPaciente() {

    if(!this.patientForm.valid){
      this.patientForm.markAllAsTouched();
      return;
    }
    this.patientService.addPatient(this.patientForm.value).subscribe({
      complete: () => {
        this.router.navigateByUrl('admin/patients/all-patients')
      },
      next: (value) => {
        Swal.fire({icon: 'success',title:'Se guardo paciente con exito'});
      },
      error: (data) => {
        Swal.fire({icon: 'error',title:'Error al registrar la cita', text: data.msg});
      },
    })
  }

  campoEsValido(campo: string){
    return (this.patientForm.controls[campo].errors && this.patientForm.controls[campo].touched);
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core';
import { PatientsService } from 'app/doctor/patients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-patient-doctor',
  templateUrl: './add-patient-doctor.component.html',
  styleUrls: ['./add-patient-doctor.component.scss']
})
export class AddPatientDoctorComponent {

  patientForm: FormGroup;

  constructor( private fb: FormBuilder, 
               private patientService: PatientsService, 
               private router: Router,
               private authService: AuthService){
    this.patientForm = this.fb.group({
      nombre: [, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      apellidos: [,[Validators.required, Validators.pattern('[a-zA-Z]+')]],
      fecha_nacimiento: [, [Validators.required]],
      genero: [, [Validators.required]],
      correo: [, 
        [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      ],
      telefono: [, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      google: [false],
      rol: ['Paciente'],
      password: ['Admin123'],
      medico: [],
      fecha_registro: [new Date().toISOString()]
    });
  }

  guardarPaciente() {

    if(!this.patientForm.valid){
      this.patientForm.markAllAsTouched();
      return;
    }

    this.patientForm.get('medico')?.setValue([this.authService.currentUserValue.userLogin.correo]);
    console.log(this.patientForm.value)

    this.patientService.addPatient(this.patientForm.value).subscribe({
      complete: () => {
        this.router.navigateByUrl('doctor/patients')
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

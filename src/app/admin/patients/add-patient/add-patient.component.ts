import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';
import { PatientsService } from 'app/doctor/patients.service';
import { Medico } from 'app/interfaces/Medico.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent {

  patientForm: FormGroup;
  medics: Medico[] = [];

  constructor(private fb: FormBuilder, private patientService: PatientsService, private router: Router,
              public doctorsService: DoctorsService
  ) {
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
      fecha_registro: [new Date().toISOString()],
      medico: [, Validators.required]
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.doctorsService.getAllDoctorss().subscribe( data => {
      this.medics = data.medicos;
    });
  }

  guardarPaciente() {

    if(!this.patientForm.valid){
      this.patientForm.markAllAsTouched();
      return;
    }
    const idMedico = this.patientForm.get('medico')?.value;
    this.doctorsService.getDoctorById(idMedico).subscribe( data => {
      // console.log(data)
      this.patientForm.get('medico')?.setValue([data.medico.correo]);
      // console.log(this.patientForm.value)
      this.patientService.addPatient(this.patientForm.value).subscribe({
        complete: () => {
          this.router.navigateByUrl('admin/patients/all-patients')
        },
        next: (value) => {
          Swal.fire({icon: 'success',title:'Se guardo paciente con exito'});
        },
        error: (data) => {
          Swal.fire({icon: 'error',title:'Error al registrar al paciente', text: data.msg});
        },
      })
    })
  }

  campoEsValido(campo: string){
    return (this.patientForm.controls[campo].errors && this.patientForm.controls[campo].touched);
  }
}

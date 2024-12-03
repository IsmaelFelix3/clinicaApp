import { Component, OnInit } from '@angular/core';
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
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss'],
})
export class EditPatientComponent implements OnInit {
  patientForm: FormGroup;
  state: any;
  idPaciente: number = 0;
  constructor(private fb: FormBuilder, private patientService: PatientsService, private router: Router) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    this.patientForm = this.fb.group({
      nombre: [, [Validators.required]],
      apellidos: [,[Validators.required]],
      fecha_nacimiento: [, [Validators.required]],
      genero: [, [Validators.required]],
      correo: [, 
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      telefono: [, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {

    if(this.state == undefined){
      this.router.navigateByUrl('admin/patients/all-patients');
      return;
    }

    this.idPaciente = this.state.idPaciente;

    this.patientService.getPatientById(this.idPaciente).subscribe({
      next: (value) => {
        console.log(value)
        this.patientForm.get('nombre')?.setValue(value.paciente.nombre);
        this.patientForm.get('apellidos')?.setValue(value.paciente.apellidos);
        this.patientForm.get('fecha_nacimiento')?.setValue(value.paciente.fecha_nacimiento);
        this.patientForm.get('correo')?.setValue(value.paciente.correo);
        this.patientForm.get('telefono')?.setValue(value.paciente.telefono);
        this.patientForm.get('genero')?.setValue(value.paciente.genero);
      },
    });

    
  }
  editarPaciente() {
    console.log(this.patientForm)
    
    if(!this.patientForm.valid){
      this.patientForm.markAllAsTouched();
      return;
    }
    
    this.patientService.editPatient(this.idPaciente,this.patientForm.value).subscribe({
      complete: () => {
        this.router.navigateByUrl('admin/patients/all-patients')
      },
      next: (value) => {
        Swal.fire({icon: 'success',title:'Se edito el paciente con exito'});
      },
      error: (data) => {
        Swal.fire({icon: 'error',title:'Error al registrar la cita', text: data.msg});
      },
    })
  }

  return(){
    this.router.navigateByUrl('admin/patients/all-patients');
  }

  deshabilitar(){
    let nombrePaciente = this.patientForm.get('nombre')?.value + ' ' + this.patientForm.get('apellidos')?.value
    Swal.fire({
      title: `¿Desea deshablitar al paciente ${nombrePaciente} ?`,
      showDenyButton: true,
      confirmButtonText: 'Continuar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.patientService.disablePatient(this.idPaciente).subscribe({
          complete: () => {
            this.router.navigateByUrl('admin/patients/all-patients');
          },
          next: (value) => {
            Swal.fire({icon: 'success',title:'Se deshabilito al paciente correctamente.'});
          },
          error: (error) => {
            Swal.fire({icon: 'error',title:'Error al deshabiltar al medico', text: error.msg});
          }
        });
      }
    })
  }

  campoEsValido(campo: string){
    return (this.patientForm.controls[campo].errors && this.patientForm.controls[campo].touched);
  }
}

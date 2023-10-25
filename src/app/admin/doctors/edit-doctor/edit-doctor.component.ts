import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorsService } from '../alldoctors/doctors.service';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss'],
})
export class EditDoctorComponent implements OnInit {

  state: any = {};
  idMedico: number = 0;

  doctorForm: FormGroup = this.fb.group({
    nombre: [, [Validators.required]],
    apellidos: [, [Validators.required]],
    telefono: [, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    especialidad: [, [Validators.required]],
    cedula: [, [Validators.required]],
    permiso_secre_salud: [, [Validators.required]],
    correo: [, [Validators.required, Validators.email, Validators.minLength(5)]],
    id_edificio: [, [Validators.required]],
    id_piso: [,[Validators.required]],
    consultorio: [,[Validators.required]],
});
  constructor(private fb: FormBuilder, private router: Router, public doctorService: DoctorsService) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
  }
 

  ngOnInit(): void {
    if(this.state == undefined){
      this.router.navigateByUrl('admin/doctors/allDoctors');
      return;
    }
    console.log(this.state)
    this.idMedico = this.state.id;
    this.doctorService.getDoctorById(this.idMedico).subscribe({
      next: (value) => {
        this.doctorForm.get('nombre')?.setValue(value.medico.nombre);
        this.doctorForm.get('apellidos')?.setValue(value.medico.apellidos);
        this.doctorForm.get('telefono')?.setValue(value.medico.telefono);
        this.doctorForm.get('especialidad')?.setValue(value.medico.especialidad);
        this.doctorForm.get('cedula')?.setValue(value.medico.cedula);
        this.doctorForm.get('permiso_secre_salud')?.setValue(value.medico.permiso_secre_salud);
        this.doctorForm.get('correo')?.setValue(value.medico.correo);
        this.doctorForm.get('id_edificio')?.setValue(value.medico.id_edificio);
        this.doctorForm.get('id_piso')?.setValue(value.medico.id_piso);
        this.doctorForm.get('consultorio')?.setValue(value.medico.consultorio);
      },
    });
  }

  campoEsValido(campo: string){
    return (this.doctorForm.controls[campo].errors && this.doctorForm.controls[campo].touched);
  }

  editarMedico() {
    console.log('Form Value', this.doctorForm.value);
    console.log('Form Value', this.doctorForm);

    if(!this.doctorForm.valid){
      this.doctorForm.markAllAsTouched();
      return;
    }

    this.doctorService.updateDoctor(this.doctorForm.value, this.idMedico).subscribe({
      complete: () => {
        this.router.navigateByUrl('admin/doctors/allDoctors');
      },
      next: (value) => {
        Swal.fire({icon: 'success',title:'Se guardo correctamente'});
      },
      error: (error) => {
        Swal.fire({icon: 'error',title:'Error al registrar el medico', text: error.msg});
      }
    })
  }

  deshabilitar(){
    let nombreMedico = this.doctorForm.get('nombre')?.value + ' ' + this.doctorForm.get('apellidos')?.value
    Swal.fire({
      title: `¿Desea deshablitar al medico ${nombreMedico} ?`,
      showDenyButton: true,
      confirmButtonText: 'Continuar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(this.idMedico).subscribe({
          complete: () => {
            this.router.navigateByUrl('admin/doctors/allDoctors');
          },
          next: (value) => {
            Swal.fire({icon: 'success',title:'Se deshabilito al medico correctamente.'});
          },
          error: (error) => {
            Swal.fire({icon: 'error',title:'Error al deshabiltar al medico', text: error.msg});
          }
        });
      }
    })
  }
  
}

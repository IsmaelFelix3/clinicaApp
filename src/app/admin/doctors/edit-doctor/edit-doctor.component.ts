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
import { PisoElement } from 'app/interfaces/Piso';
import { ConsultorioElement } from 'app/interfaces/Consultorio';
import { EdificioElement } from 'app/interfaces/Edificio';
import { FloorsService } from 'app/services/floors.service';
import { ConsultingRoomService } from 'app/services/consulting-room.service';
import { BuildingService } from 'app/services/building.service';
@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss'],
})
export class EditDoctorComponent implements OnInit {

  state: any = {};
  idMedico: number = 0;
  pisos: PisoElement[] = [];
  consultorios: ConsultorioElement[] = [];
  edificios: EdificioElement[] = [];

  doctorForm: FormGroup = this.fb.group({
    nombre: [, [Validators.required]],
    apellidos: [, [Validators.required]],
    telefono: [, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    especialidad: [, []],
    cedula: [, []],
    permiso_secre_salud: [, []],
    correo: [, [Validators.required, Validators.email, Validators.minLength(5)]],
    id_edificio: [, [Validators.required]],
    id_piso: [,[Validators.required]],
    id_consultorio: [,[Validators.required]],
});
  constructor(private fb: FormBuilder, private router: Router, public doctorService: DoctorsService, public buildingService: BuildingService,
    public floorService: FloorsService, public consultingRoom: ConsultingRoomService){
    this.state = this.router.getCurrentNavigation()?.extras.state;
  }

   getFloors(){
    console.log('entro')
    const edificioId = this.doctorForm.value.id_edificio;
    this.floorService.getFloorsByBuildingId(edificioId).subscribe( floors => {
      this.pisos = floors.pisos.rows
    });
  }

  getConsultingRooms(){
    const pisoId = this.doctorForm.value.id_piso;
    this.consultingRoom.getConsultingRoomByFloorId(pisoId).subscribe( consultingRooms => {
      this.consultorios = consultingRooms.consultorios.rows
    });
  }



  ngOnInit(): void {

    if(this.state == undefined){
      this.router.navigateByUrl('admin/doctors/allDoctors');
      return;
    }

    console.log(this.state)
    this.idMedico = this.state.id;
    this.doctorService.getDoctorById(this.idMedico).subscribe(medico => {

      this.buildingService.getRecords().subscribe( buildings => {
        this.edificios = buildings.edificios;

      });
      this.consultingRoom.getRecords().subscribe( consultingRooms => {
        console.log(consultingRooms);
        this.consultorios = consultingRooms.consultorios.rows;
        console.log(this.consultorios);
      });
      this.floorService.getRecords().subscribe( floors => this.pisos = floors.pisos.rows );

      this.doctorForm.get('nombre')?.setValue(medico.medico.nombre);
      this.doctorForm.get('apellidos')?.setValue(medico.medico.apellidos);
      this.doctorForm.get('telefono')?.setValue(medico.medico.telefono);
      this.doctorForm.get('especialidad')?.setValue(medico.medico.especialidad);
      this.doctorForm.get('cedula')?.setValue(medico.medico.cedula);
      this.doctorForm.get('permiso_secre_salud')?.setValue(medico.medico.permiso_secre_salud);
      this.doctorForm.get('correo')?.setValue(medico.medico.correo);
      this.doctorForm.get('id_edificio')?.setValue(medico.medico.id_edificio);
      this.doctorForm.get('id_piso')?.setValue(medico.medico.id_piso);
      this.doctorForm.get('id_consultorio')?.setValue(medico.medico.id_consultorio);



      console.log(this.edificios)
      console.log(this.doctorForm.value)
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

   return(){
    this.router.navigateByUrl('admin/doctors/allDoctors');
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

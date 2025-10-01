import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';
import { Medico } from 'app/interfaces/Medico.interface';
import { BankService } from 'app/services/bank.service';
import { BuildingLogService } from 'app/services/building-log.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-building-log',
  templateUrl: './add-building-log.component.html',
  styleUrls: ['./add-building-log.component.scss']
})
export class AddBuildingLogComponent {

    types: string[] = ['EMPLEADO','PACIENTE']
    doctors: Medico[] =[];
    isEmpleado: boolean =  false;


    accessLogForm: FormGroup = this.fb.group({
      tipo_ingreso: [, [Validators.required]],
      nombre_ingreso: [,[Validators.required]],
      nombre_acompanante: [,[Validators.required]],
      motivo_ingreso: [,[Validators.required]],
      medico: [,[Validators.required]],
      fecha: [,Validators.required],
      hora_entrada: [,[Validators.required]],
      hora_salida: [,[]]
    });

    constructor(private fb: FormBuilder, private router: Router, public buildingLogService: BuildingLogService, public doctorService: DoctorsService ){}

    ngOnInit(){
      this.doctorService.getAllDoctorss().subscribe( doctors => {
        this.doctors = doctors.medicos;
      })
    }

    campoEsValido(campo: string){
      return (this.accessLogForm.controls[campo].errors && this.accessLogForm.controls[campo].touched);
    }

    getType(){
      console.log('entro')
      console.log(this.accessLogForm.value.tipo_ingreso)
      this.isEmpleado = false;
      if(this.accessLogForm.value.tipo_ingreso === 'EMPLEADO'){
        this.isEmpleado = true;
      }
      console.log(this.isEmpleado)
    }

    addProcedure() {

      if(this.accessLogForm.get('tipo_ingreso')?.value === 'EMPLEADO'){
        this.accessLogForm.get('nombre_acompanante')?.setValue('N/A');
        this.accessLogForm.get('motivo_ingreso')?.setValue('N/A');
        this.accessLogForm.get('medico')?.setValue(0);
      }else {
        this.accessLogForm.get('nombre_acompanante')?.setValue(this.accessLogForm.value.nombre_acompanante.toUpperCase());
        this.accessLogForm.get('motivo_ingreso')?.setValue(this.accessLogForm.value.motivo_ingreso.toUpperCase());
      }

      const day = new Date().getUTCDate();
      const month = new Date().getUTCMonth();
      const year = new Date().getUTCFullYear();
      const fecha = new Date(year, month, day).toUTCString();
      this.accessLogForm.get('nombre_ingreso')?.setValue(this.accessLogForm.value.nombre_ingreso.toUpperCase());
      this.accessLogForm.get('fecha')?.setValue(fecha);

      console.log(this.accessLogForm.value)

      //  if(!this.accessLogForm.valid){
      //   this.accessLogForm.markAllAsTouched();
      //   return;
      // }


      this.buildingLogService.addBuildingLog(this.accessLogForm.value).subscribe({
        complete: () => {
          this.router.navigateByUrl('admin/accessLog/buildingLog');
        },
        next: (value) => {
          console.log(value)
          Swal.fire({icon: 'success',title:'Registro se guardo correctamente'});
        },
        error: (error) => {
          Swal.fire({icon: 'error',title:'Error al guardar el Registro', text: error.msg});
        }
      })
    }

      return(){
      this.router.navigateByUrl('admin/accessLog/buildingLog');
    }


}

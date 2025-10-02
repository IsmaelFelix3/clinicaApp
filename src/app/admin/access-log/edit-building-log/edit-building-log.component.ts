import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';
import { Medico } from 'app/interfaces/Medico.interface';
import { BuildingLogService } from 'app/services/building-log.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-building-log',
  templateUrl: './edit-building-log.component.html',
  styleUrls: ['./edit-building-log.component.scss']
})
export class EditBuildingLogComponent {

  types: string[] = ['EMPLEADO','PACIENTE', 'MEDICO CONSULTA','ANESTESIOLOGO', 'MEDICO AYUDANTE','REPRESENTANTE MEDICO','TRABAJADOR EXTERNO','VISITA PERSONAL']
  doctors: Medico[] =[];
  isEmpleado: boolean =  false;
  state: any = {}
  id: number = 0;

  constructor(private fb: FormBuilder, private router: Router, public buildingLogService: BuildingLogService, public doctorService: DoctorsService ){
    this.state = this.router.getCurrentNavigation()?.extras.state;
  }

   accessLogForm: FormGroup = this.fb.group({
    id:[],
    tipo_ingreso: [, [Validators.required]],
    nombre_ingreso: [,[Validators.required]],
    nombre_acompanante: [,[Validators.required]],
    motivo_ingreso: [,[Validators.required]],
    medico: [,[Validators.required]],
    // fecha: [,Validators.required],
    hora_entrada: [,[Validators.required]],
    hora_salida: [,[Validators.required]]
  });

  ngOnInit(){
    if(this.state == undefined){
      this.router.navigateByUrl('admin/accessLog/buildingLog');
      return;
    }
    this.id = this.state.id;
    this.doctorService.getAllDoctorss().subscribe( doctors => {
      this.doctors = doctors.medicos;
    });

    this.buildingLogService.getBuildingLogById(this.id).subscribe( data =>{
      console.log(data.registro.tipo_ingreso)
      this.isEmpleado = data.registro.tipo_ingreso === 'EMPLEADO' || data.registro.tipo_ingreso === 'MEDICO CONSULTA' ? true : false;
      this.accessLogForm.get('id')?.setValue(this.id);
      this.accessLogForm.get('tipo_ingreso')?.setValue(data.registro.tipo_ingreso);
      this.accessLogForm.get('nombre_ingreso')?.setValue(data.registro.nombre_ingreso);
      this.accessLogForm.get('nombre_acompanante')?.setValue(data.registro.nombre_acompanante);
      this.accessLogForm.get('motivo_ingreso')?.setValue(data.registro.motivo_ingreso);
      this.accessLogForm.get('medico')?.setValue(data.registro.medico);
      // this.accessLogForm.get('fecha')?.setValue(data.registro);
      this.accessLogForm.get('hora_entrada')?.setValue(data.registro.hora_entrada);
      this.accessLogForm.get('hora_salida')?.setValue(data.registro.hora_salida);
    })

  }

   campoEsValido(campo: string){
      return (this.accessLogForm.controls[campo].errors && this.accessLogForm.controls[campo].touched);
    }

    getType(){
      this.isEmpleado = false;
       if(this.accessLogForm.value.tipo_ingreso === 'EMPLEADO' || this.accessLogForm.value.tipo_ingreso === 'MEDICO CONSULTA'){
        this.isEmpleado = true;
      }
    }

  addProcedure() {

        if(this.accessLogForm.get('type')?.value === 'EMPLEADO' || this.accessLogForm.value.tipo_ingreso === 'MEDICO CONSULTA'){
          this.accessLogForm.get('acompanante')?.setValue('N/A');
          this.accessLogForm.get('motivo')?.setValue('N/A');
          this.accessLogForm.get('medico')?.setValue(0);
        }else {
          this.accessLogForm.get('acompanante')?.setValue(this.accessLogForm.value.acompanante.toUpperCase());
          this.accessLogForm.get('motivo')?.setValue(this.accessLogForm.value.motivo.toUpperCase());
        }

        const day = new Date().getUTCDate();
        const month = new Date().getUTCMonth();
        const year = new Date().getUTCFullYear();
        const fecha = new Date(year, month, day).toUTCString();
        this.accessLogForm.get('nombre')?.setValue(this.accessLogForm.value.nombre.toUpperCase());
        this.accessLogForm.get('fecha')?.setValue(fecha);

        console.log(this.accessLogForm.value)

        //  if(!this.accessLogForm.valid){
        //   this.accessLogForm.markAllAsTouched();
        //   return;
        // }


        this.buildingLogService.editBuildingLog(this.accessLogForm.value).subscribe({
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

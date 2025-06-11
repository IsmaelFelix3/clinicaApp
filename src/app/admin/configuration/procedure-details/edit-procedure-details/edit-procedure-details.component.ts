import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';
import { Quirofano } from 'app/interfaces/Procedimiento';
import { ProceduresCatalogService } from 'app/services/procedures-catalog.service';
import { QuirofanosService } from 'app/services/quirofanos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-procedure-details',
  templateUrl: './edit-procedure-details.component.html',
  styleUrls: ['./edit-procedure-details.component.scss']
})
export class EditProcedureDetailsComponent {

    state: any = {};
    idProcedimiento: number = 0;
    quirofanos: Quirofano[] = [];

    procedureDetailsForm: FormGroup = this.fb.group({
      id_procedimiento: [, [Validators.required]],
      nombre_procedimiento: [, [Validators.required]],
      especialidad: [, [Validators.required]],
      precioBase: [, [Validators.required]],
      quirofano: [, [Validators.required]],
  });
    constructor(private fb: FormBuilder, private router: Router, public proceduresCatalog: ProceduresCatalogService, public quirofanosService: QuirofanosService) {
      this.state = this.router.getCurrentNavigation()?.extras.state;
    }


    ngOnInit(): void {
      if(this.state == undefined){
        this.router.navigateByUrl('admin/configuration/procedureDetails');
        return;
      }

       this.quirofanosService.getQuirofanos().subscribe(quirofanos => {
        this.quirofanos = quirofanos.quirofanos.rows;
      });

      console.log(this.state)
      this.idProcedimiento = this.state.id;
      this.proceduresCatalog.getProcedureConfigurationDetails(this.idProcedimiento).subscribe({
        next: (value) => {
          console.log(value)
          this.procedureDetailsForm.get('id_procedimiento')?.setValue(value.detallesProcedimiento.id_procedimiento);
          this.procedureDetailsForm.get('nombre_procedimiento')?.setValue(value.detallesProcedimiento.nombre_procedimiento);
          this.procedureDetailsForm.get('especialidad')?.setValue(value.detallesProcedimiento.especialidad);
          this.procedureDetailsForm.get('quirofano')?.setValue(value.detallesProcedimiento.quirofano);
          this.procedureDetailsForm.get('precioBase')?.setValue(value.detallesProcedimiento.precioBase);
        },
      });
    }

    campoEsValido(campo: string){
      return (this.procedureDetailsForm.controls[campo].errors && this.procedureDetailsForm.controls[campo].touched);
    }

    editProcedure() {
      if(!this.procedureDetailsForm.valid){
        this.procedureDetailsForm.markAllAsTouched();
        return;
      }

      this.proceduresCatalog.updateProcedureConfigurationDetails(this.procedureDetailsForm.value, this.idProcedimiento).subscribe({
        complete: () => {
          this.router.navigateByUrl('admin/configuration/procedureDetails');
        },
        next: (value) => {
          Swal.fire({icon: 'success',title:'Se guardo correctamente'});
        },
        error: (error) => {
          Swal.fire({icon: 'error',title:'Error al editar el procedimiento', text: error.msg});
        }
      })
    }

     return(){
      this.router.navigateByUrl('admin/configuration/procedureDetails');
    }

    deshabilitar(){
      let procedureName = this.procedureDetailsForm.get('nombre_procedimiento')?.value;
      Swal.fire({
        title: `¿Desea eliminar el procedimiento ${procedureName} ?`,
        showDenyButton: true,
        confirmButtonText: 'Continuar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.proceduresCatalog.deleteProcedureConfigurationDetails(this.idProcedimiento).subscribe({
            complete: () => {
              this.router.navigateByUrl('admin/configuration/procedureDetails');
            },
            next: (value) => {
              Swal.fire({icon: 'success',title:'Se elimino el procedimiento correctamente.'});
            },
            error: (error) => {
              Swal.fire({icon: 'error',title:'Error al intentar eliminar el procedimiento', text: error.msg});
            }
          });
        }
      })
    }


}

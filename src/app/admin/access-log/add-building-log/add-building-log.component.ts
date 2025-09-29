import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';
import { Medico } from 'app/interfaces/Medico.interface';
import { BankService } from 'app/services/bank.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-building-log',
  templateUrl: './add-building-log.component.html',
  styleUrls: ['./add-building-log.component.scss']
})
export class AddBuildingLogComponent {

    types: string[] = ['Empleado','Paciente']
    doctors: Medico[] =[];


    accessLogForm: FormGroup = this.fb.group({
      type: [, [Validators.required]],
      nombre: [,[Validators.required]],
      acompanante: [,[Validators.required]],
      motivo: [,[Validators.required]],
      medico: [,[Validators.required]],
      entrada: [,[Validators.required]],
      salida: [,[Validators.required]]

    });

    constructor(private fb: FormBuilder, private router: Router, public bankService: BankService, public doctorService: DoctorsService ){}

    ngOnInit(){
      this.doctorService.getAllDoctorss().subscribe( doctors => {
        this.doctors = doctors.medicos;
      })
    }

    campoEsValido(campo: string){
      return (this.accessLogForm.controls[campo].errors && this.accessLogForm.controls[campo].touched);
    }

    addProcedure() {
      if(!this.accessLogForm.valid){
        this.accessLogForm.markAllAsTouched();
        return;
      }

      this.accessLogForm.get('nombre')?.setValue(this.accessLogForm.value.nombre.toUpperCase());

      this.bankService.addBank(this.accessLogForm.value).subscribe({
        complete: () => {
          this.router.navigateByUrl('admin/accounting/banksCatalog');
        },
        next: (value) => {
          console.log(value)
          Swal.fire({icon: 'success',title:'Banco se guardo correctamente'});
        },
        error: (error) => {
          Swal.fire({icon: 'error',title:'Error al guardar el banco', text: error.msg});
        }
      })
    }

      return(){
      this.router.navigateByUrl('admin/accounting/banksCatalog');
    }


}

import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../patients.service';
import { Paciente, PacienteShort, Pacientes } from 'app/interfaces/Paciente.interface';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { AuthService } from '../../core/service/auth.service';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.scss']
})
export class MedicalRecordsComponent implements OnInit {

  patients: Paciente[] = [];
  idMedico = 0;
  option:any;

  constructor(public pacienteService: PatientsService, public authService:AuthService, public doctorService: DoctorsService){

  }

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;

  ngOnInit() {

    const correoMedico = this.authService.currentUserValue.userLogin.correo;
    this.doctorService.getDoctorByEmail(correoMedico).subscribe( doctor => {
      this.idMedico = doctor.medico.id_medico;
      this.pacienteService.getAllPatients(this.idMedico).subscribe( data => {
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
  
      });
    })

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}

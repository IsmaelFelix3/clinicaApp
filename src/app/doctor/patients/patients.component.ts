import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../patients.service';
import { PacienteShort } from 'app/interfaces/Paciente.interface';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit{

  displayedColumns = [
    // 'select',
    // 'img',
    'name',
    'email',
    'mobile',
    'age',
    'medicalRecord',
    // 'actions',
    'bloodType'
  ];

  constructor(public patientService: PatientsService, public dialog: MatDialog,){}

  patients: PacienteShort[] = [];

  ngOnInit(): void {
    this.patientService.getAllPatients().subscribe({
      complete: () => {
        this.patientService.isTblLoading = false;
      },
      next: (patients) => {
        this.patients = patients.paciente.map( element => {

          console.log(new Date(element.fecha_nacimiento).toUTCString())
          return {
            idPaciente: element.id_paciente,
            nombre: element.nombre,
            apellidos: element.apellidos,
            edad: this.calculate_age(new Date (element.fecha_nacimiento)),
            genero: element.lugar_nacimiento,
            lugarNacimiento: element.lugar_nacimiento,
            calle: element.calle_y_numero,
            colonia: element.colonia,
            municipio: element.municipio,
            estado: element.estado,
            correo: element.correo,
            telefono: element.telefono,
            idExpediente: element.id_expediente,
            fechaRegistro: element.fecha_registro,
            bloodType: element.Expediente!.tipo_sanguineo
          }
        });
      },
      error(err) {
        
      },
    });
  }

  calculate_age(dob: Date) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  detailsCall(row: any){
    this.dialog.open(PatientDetailsComponent, {
      height: '71%',
      width: '35%',
    });
  }

}

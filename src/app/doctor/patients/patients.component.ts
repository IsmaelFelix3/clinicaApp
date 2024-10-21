import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientsService } from '../patients.service';
import { PacienteShort } from 'app/interfaces/Paciente.interface';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../core/service/auth.service';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';

import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  providers: [DoctorsService]
})
export class PatientsComponent implements OnInit{

  dataSource = new MatTableDataSource<PacienteShort>();

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
  patients: PacienteShort[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public patientService: PatientsService, 
              public dialog: MatDialog, 
              public authService: AuthService,
              public doctorService: DoctorsService){}


  ngOnInit(): void {

    this.doctorService.getDoctorByEmail(this.authService.currentUserValue.userLogin.correo).subscribe( doctor => {
      const idMedico = doctor.medico.id_medico;
      this.patientService.getAllPatients(idMedico).subscribe({
        complete: () => {
          this.patientService.isTblLoading = false;
        },
        next: (patients) => {
          this.patients = patients.paciente.map( element => {
            
            return {
              idPaciente: element.id_paciente,
              nombre: element.nombre,
              apellidos: element.apellidos,
              edad: this.calculate_age(new Date (element.fecha_nacimiento)),
              fecha_nacimiento: element.fecha_nacimiento,
              genero: element.genero,
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
          this.dataSource = new MatTableDataSource(this.patients);
          this.dataSource.paginator = this.paginator;
        },
        error(err) {
          Swal.fire({ icon: 'error', title: 'Error', text: 'Error al obtener el listado de pacientes ' + err })
        },
      });
    });

    

    // this.filterTable();
    this.dataSource.filterPredicate = (record,filter) => {
      return record.nombre.toLocaleLowerCase() == filter.toLocaleLowerCase();
    }
  }

  applyFilter(event: Event): void {
    const filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
    this.dataSource.filter = filter;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 

  // filterTable() {
  //   this.dataSource.filterPredicate = (data: PacienteShort, filter: string): boolean => {
  //     return (
  //       data.nombre.toLocaleLowerCase().includes(filter)
  //     )
  //   }
  // }

  calculate_age(dob: Date) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  detailsCall(row: any){
    console.log(row)
    this.dialog.open(PatientDetailsComponent, {
      data: {
        action: 'informacionPaciente',
        details: row
      },
     
      width: '40%',
    });
  }

}

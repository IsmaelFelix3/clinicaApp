import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PacienteShort } from 'app/interfaces/Paciente.interface';
import { MedicalRecordComponent } from '../medical-record/medical-record.component';

export interface DialogData {
  id: number;
  action: string;
  details: PacienteShort;
}

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})

export class PatientDetailsComponent {

  patientDetails!: PacienteShort;

  direccion: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog){}

  ngOnInit(): void {
    console.log(this.data.action);
    console.log('regreso')
    if(this.data.action == 'return'){
      console.log('first')
      console.log(this.data)
      this.patientDetails = this.data.details;
    }
    this.patientDetails = this.data.details;
    this.direccion = this.patientDetails.municipio + ', ' + this.patientDetails.estado + ' ' + this.patientDetails.calle + ' ' + this.patientDetails.colonia;
    if( this.patientDetails.municipio == 'Sin informacion' && this.patientDetails.estado == 'Sin informacion' 
        && this.patientDetails.calle == 'Sin informacion' && this.patientDetails.colonia == 'Sin informacion'){
          this.direccion = 'Sin dirección registrada';
      }
    
  }

  closeModal(){
    this.dialog.closeAll();
  }

  openMedicalRecord(){
    this.dialog.open(MedicalRecordComponent, {
      data: {
        details: this.patientDetails,
        action: 'medicalRecord'
      },
      height: '80%',
      width: '60%',
    });
  }

}

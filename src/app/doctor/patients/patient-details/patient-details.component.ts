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

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog){}

  ngOnInit(): void {
    console.log(this.data);
    this.patientDetails = this.data.details;
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

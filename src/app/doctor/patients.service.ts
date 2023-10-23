import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Expediente } from 'app/interfaces/Expediente.interface';
import { Pacientes } from 'app/interfaces/Paciente.interface';
import { NuevaCita } from 'app/interfaces/Cita.interface';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  isTblLoading = true;

  constructor(public http: HttpClient) { }

  getAllPatients(idMedico: number){
    return this.http.get<Pacientes>(`http://localhost:8000/api/pacientes/${idMedico}`);
  }

  getMedicalRecordById(idExpediente: number){
    return this.http.get<Expediente>(`http://localhost:8000/api/expedientes/${idExpediente}`);
  }

  saveMedicalRecord(medicalRecord: Expediente){
    return this.http.post(`http://localhost:8000/api/expedientes/`,medicalRecord);
  }

  updateMedicalRecord(medicalRecord: Expediente, idExpediente: number){
    return this.http.put(`http://localhost:8000/api/expedientes/${idExpediente}`,medicalRecord);
  }

  addAppoinment(newAppoinment: NuevaCita){
    return this.http.post(`http://localhost:8000/api/citas/`, newAppoinment);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Expediente } from 'app/interfaces/Expediente.interface';
import { PacienteEdit, PacienteEditResponse, Pacientes, PacientesByAdmin } from 'app/interfaces/Paciente.interface';
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

  getAllPatientsAdmin(){
    return this.http.get<PacientesByAdmin>(`http://localhost:8000/api/pacientes/allPatientsAdm/`);
  }

  getPatientById(idPaciente: number){
    return this.http.get<PacienteEditResponse>(`http://localhost:8000/api/pacientes/patientById/${idPaciente}`);
  }

  addPatient(patient: any){
    return this.http.post(`http://localhost:8000/api/pacientes`,patient);
  }

  editPatient(idPaciente: number, patient: PacienteEdit){
    return this.http.put(`http://localhost:8000/api/pacientes/${idPaciente}`,patient);
  }

  disablePatient(idPaciente: number){
    return this.http.delete(`http://localhost:8000/api/pacientes/${idPaciente}`);
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
}

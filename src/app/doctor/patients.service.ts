import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Expediente } from 'app/interfaces/Expediente.interface';
import { PacienteEdit, PacienteEditResponse, Pacientes, PacientesByAdmin } from 'app/interfaces/Paciente.interface';
import { NuevaCita } from 'app/interfaces/Cita.interface';
import { catchError, throwError } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  isTblLoading = true;
  urlEndpoint: string = environment.patientsEndpoints;
  urlApi: string = environment.api;
  urlMedicalRecordEndpoint: string = environment.medicalRecordEndpoint;

  constructor(public http: HttpClient) { }

  getAllPatients(idMedico: number){
    return this.http.get<Pacientes>(`${this.urlApi}${this.urlEndpoint}${idMedico}`);
  }

  getAllPatientsAdmin(){
    return this.http.get<PacientesByAdmin>(`${this.urlApi}${this.urlEndpoint}allPatientsAdm/`);
  }

  getPatientById(idPaciente: number){
    return this.http.get<PacienteEditResponse>(`${this.urlApi}${this.urlEndpoint}patientById/${idPaciente}`);
  }

  addPatient(patient: any){
    return this.http.post(`${this.urlApi}pacientes`,patient);
  }

  editPatient(idPaciente: number, patient: PacienteEdit){
    return this.http.put(`${this.urlApi}${this.urlEndpoint}${idPaciente}`,patient);
  }

  disablePatient(idPaciente: number){
    return this.http.delete(`${this.urlApi}${this.urlEndpoint}${idPaciente}`);
  }

  getMedicalRecordById(idExpediente: number){
    return this.http.get<Expediente>(`${this.urlApi}${this.urlMedicalRecordEndpoint}${idExpediente}`);
  }

  saveMedicalRecord(medicalRecord: Expediente){
    return this.http.post(`${this.urlApi}${this.urlMedicalRecordEndpoint}`,medicalRecord);
  }

  updateMedicalRecord(medicalRecord: Expediente, idExpediente: number){
    return this.http.put(`${this.urlApi}${this.urlMedicalRecordEndpoint}${idExpediente}`,medicalRecord);
  }
}

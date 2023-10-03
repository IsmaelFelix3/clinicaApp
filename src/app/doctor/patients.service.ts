import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expediente } from 'app/interfaces/Expediente.interface';
import { Pacientes } from 'app/interfaces/Paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  isTblLoading = true;

  constructor(public http: HttpClient) { }

  getAllPatients(){
    return this.http.get<Pacientes>(`http://localhost:8000/api/pacientes`);
  }

  getMedicalRecordById(idExpediente: number){
    return this.http.get<Expediente>(`http://localhost:8000/api/expedientes/${idExpediente}`);
  }

  saveMedicalRecord(medicalRecord: Expediente){
    return this.http.post(`http://localhost:8000/api/expedientes/`,medicalRecord);
  }
}

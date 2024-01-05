import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetProcedimientosRequest, GetProcedimientosTableRequest, ProcedimientoPost, ProcedimientosRequest } from 'app/interfaces/Procedimiento';

@Injectable({
  providedIn: 'root'
})
export class CliqProceduresService {

  baseURL = 'http://localhost:8000/api/';
  apiURL = 'procedimientos';

  constructor(public http: HttpClient) { }

  getCurrentProceduresDoctor(idMedico: number){
    return this.http.get<GetProcedimientosTableRequest>(`${this.baseURL}${this.apiURL}/getCurrentProceduresDoctor/${idMedico}`);
  }

  getProceduresByDay(date: string, idQuirofano: number){
    return this.http.get<ProcedimientosRequest>(`${this.baseURL}${this.apiURL}/getProceduresByDay/${date}&${idQuirofano}`);
  }

  getProceduresCalendarDoctor(date: string, idQuirofano: number){
    return this.http.get<GetProcedimientosTableRequest>(`${this.baseURL}${this.apiURL}/getProceduresCalendarDoctor/${date}&${idQuirofano}`);
  }

  scheduleProcedure(body: ProcedimientoPost){
    return this.http.post(`${this.baseURL}${this.apiURL}/addProcedure`, body);

  }

  editProcedure(body: ProcedimientoPost, idReserva: number){
    return this.http.put(`${this.baseURL}${this.apiURL}/editProcedure/${idReserva}`, body);
  }

  deleteProcedure(){

  }
}

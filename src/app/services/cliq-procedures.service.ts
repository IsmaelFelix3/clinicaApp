import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetProcedimientosRequestCount, GetProcedimientosTableRequest, GetProcedimientosTableRequestAdmin, ProcedimientoPost, ProcedimientosRequest } from 'app/interfaces/Procedimiento';

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

  getProceduresCalendarDoctor(date: string, idMedico: number){
    return this.http.get<GetProcedimientosTableRequest>(`${this.baseURL}${this.apiURL}/getProceduresCalendarDoctor/${date}&${idMedico}`);
  }
  
  getProceduresCalendarAdmin(date: string, idMedico: number){
    return this.http.get<GetProcedimientosTableRequestAdmin>(`${this.baseURL}${this.apiURL}/getProceduresCalendarAdmin/${date}&${idMedico}`);
  }

  getProceduresMonthDoctor(idMedico: number){
    return this.http.get<GetProcedimientosRequestCount>(`${this.baseURL}${this.apiURL}/getProceduresMonthDoctor/${idMedico}`);
  }

  scheduleProcedure(body: ProcedimientoPost){
    return this.http.post(`${this.baseURL}${this.apiURL}/addProcedure`, body);

  }

  editProcedure(body: ProcedimientoPost, idReserva: number){
    return this.http.put(`${this.baseURL}${this.apiURL}/editProcedure/${idReserva}`, body);
  }

  getAllProceduresDay(role: string, date: string){
    if(role == 'Admin'){
      return this.http.get<GetProcedimientosTableRequestAdmin>(`${this.baseURL}${this.apiURL}/getProcedures/${date}`);
    }
    return this.http.get<GetProcedimientosTableRequestAdmin>(`${this.baseURL}${this.apiURL}/getProcedures/null`);
    
  }

  deleteProcedure(){

  }
}

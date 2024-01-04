import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Procedimiento, ProcedimientoPost, ProcedimientosRequest } from 'app/interfaces/Procedimiento';

@Injectable({
  providedIn: 'root'
})
export class CliqProceduresService {

  baseURL = 'http://localhost:8000/api/';
  apiURL = 'procedimientos';

  constructor(public http: HttpClient) { }

  getProcedures(){

  }

  getProceduresByDay(date: string, idQuirofano: number){
    return this.http.get<ProcedimientosRequest>(`${this.baseURL}${this.apiURL}/getProceduresByDay/${date}&${idQuirofano}`);
  }

  scheduleProcedure(body: ProcedimientoPost){
    return this.http.post(`${this.baseURL}${this.apiURL}/addProcedure`, body);

  }

  editProcedure(){

  }

  deleteProcedure(){

  }
}

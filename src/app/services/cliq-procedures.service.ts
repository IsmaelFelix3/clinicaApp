import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeleteProcedure, GetProcedimiento, GetProcedimientosCalendar, GetProcedimientosRequestCount, GetProcedimientosTableRequest, GetProcedimientosTableRequestAdmin, ProcedimientoPost, ProcedimientosRequest } from 'app/interfaces/Procedimiento';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CliqProceduresService {

  baseURL = 'http://localhost:8000/api/';
  apiURL = 'procedimientos';

  auxEvents: any[] = [];

  constructor(public http: HttpClient) { }

  getProcedure(id: number){
    return this.http.get<GetProcedimiento>(`${this.baseURL}${this.apiURL}/getProcedure/${id}`);
  }

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

  scheduleProcedure(body: any){
    return this.http.post(`${this.baseURL}${this.apiURL}/addProcedure`, body);
  }

  editProcedure(body: any, idReserva: number){
    return this.http.put(`${this.baseURL}${this.apiURL}/editProcedure/${idReserva}`, body);
  }

  getAllProceduresDay(role: string, date: string){
    if(role == 'Admin'){
      return this.http.get<GetProcedimientosTableRequestAdmin>(`${this.baseURL}${this.apiURL}/getProcedures/${date}`);
    }
    return this.http.get<GetProcedimientosTableRequestAdmin>(`${this.baseURL}${this.apiURL}/getProcedures/null`);
  }

  deleteProcedure(idReserva: number){
    return this.http.delete<DeleteProcedure>(`${this.baseURL}${this.apiURL}/deleteProcedure/${idReserva}`);
  }

  getAllProceduresCurrentDay(){
    return this.http.get<GetProcedimientosTableRequestAdmin>(`${this.baseURL}${this.apiURL}/getAllProceduresCurrentDay/`);
  }

  getProceduresDoctorFC(idMedico: number){
    return this.http.get<GetProcedimientosCalendar>(`${this.baseURL}${this.apiURL}/getProceduresDoctorFC/${idMedico}`).pipe(
      map( procedures =>
        {
            console.log(procedures)
            let array = procedures.procedimientos.map( element => {
            const userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
            const date1 = new Date(new Date(element.fecha_procedimiento_inicio).getTime() + userTimezoneOffset);
            const date2 = new Date(new Date(element.fecha_procedimiento_fin).getTime() + userTimezoneOffset);

            return {
              idBooking: element.id_reserva,
              title: element.Medico.apellidos + ' ' + element.Quirofano.nombre_quirofano,
              start: date1,
              end: date2,
              className: element.Quirofano.color,
              groupId: "Procedimientos",
              details: `${ element.detalles }` 
            }
          })
          return array;
        }
      )
    )
  }

  
  getProceduresMonth(){
    return this.http.get<GetProcedimientosCalendar>(`${this.baseURL}${this.apiURL}/getProceduresMonth/`).pipe(
      map( procedures =>
        {
            console.log(procedures)
            let array = procedures.procedimientos.map( element => {
            const userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
            const date1 = new Date(new Date(element.fecha_procedimiento_inicio).getTime() + userTimezoneOffset);
            const date2 = new Date(new Date(element.fecha_procedimiento_fin).getTime() + userTimezoneOffset);

            return {
              idBooking: element.id_reserva,
              title: element.Medico.apellidos + ' ' + element.Quirofano.nombre_quirofano,
              start: date1,
              end: date2,
              className: element.Quirofano.color,
              groupId: "Procedimientos",
              details: `${ element.detalles }` 
            }
          })
          return array;
        }
      )
    )
  }
}

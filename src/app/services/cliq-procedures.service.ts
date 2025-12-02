import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IncomeProcedures } from 'app/interfaces/IncomeProcedures';
import { DeleteProcedure, GetProcedimiento, GetProcedimientosCalendar, GetProcedimientosRequestCount, GetProcedimientosTableRequest, GetProcedimientosTableRequestAdmin, PostTotalProcedimientoByIdReport, ProcedimientoPost, ProcedimientosRequest, TotalProceduresByDates, TotalProceduresByMonth, TotalProceduresMonthsByIDReportResponse } from 'app/interfaces/Procedimiento';
import { AccountingProcedure, ClosedProcedureInformation } from 'app/interfaces/ProcedimientoContabilidad';
import { AcumulativeReport, CountProceduresOR, IncomeProcedureMonthReport, IncomeProcedureOR } from 'app/interfaces/Report';
import { environment } from 'environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CliqProceduresService {

  baseURL: string = environment.api;
  apiURL: string = environment.cliqProceduresEndpoint;

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
            return {
              idBooking: element.id_reserva,
              title: element.Medico.apellidos + ' ' + element.Quirofano.nombre_quirofano,
              start: new Date(element.fecha_procedimiento_inicio),
              end: new Date(element.fecha_procedimiento_fin),
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

  getAccountingProcedures(date: string){
    return this.http.get<AccountingProcedure>(`${this.baseURL}${this.apiURL}/getAccountingProcedures/${date}`);
  }

  postAccountingProcedure(object: ClosedProcedureInformation){
     return this.http.post<AccountingProcedure>(`${this.baseURL}${this.apiURL}/addAccountingProcedure/`, object);
  }

  postMassCreationProcedures(object: any){
     return this.http.post<AccountingProcedure>(`${this.baseURL}${this.apiURL}/postProceduresMasive/`, object);
  }

  getPIByOR(start: string,end: string){
    return this.http.get<IncomeProcedures>(`${this.baseURL}${this.apiURL}/getPIByOR/${start}&${end}`);
  }

  getAcumulativeProceduresReport(){
    return this.http.get<AcumulativeReport>(`${this.baseURL}${this.apiURL}/getAcumulativeProceduresReport/`);
  }

  getIncomesProceduresByMonth(){
    return this.http.get<IncomeProcedureMonthReport>(`${this.baseURL}${this.apiURL}/getTotalIncomesProceduresMonth/`);
  }

  getTotalIncomesByOR(){
    return this.http.get<IncomeProcedureOR>(`${this.baseURL}${this.apiURL}/getTotalIncomesByOperatingRoom/`);
  }

  getTotalCountByOR(){
    return this.http.get<CountProceduresOR>(`${this.baseURL}${this.apiURL}/getTotalProceduresByOperatingRoom/`);
  }

  getTotalMonthProceduresByIdReport(body: PostTotalProcedimientoByIdReport){
    return this.http.post<TotalProceduresMonthsByIDReportResponse>(`${this.baseURL}${this.apiURL}/getTotalMonthProceduresByIdReport/`,body);
  }

  getProceduresReportByDates(start: string, end: string){
     return this.http.get<TotalProceduresByDates>(`${this.baseURL}${this.apiURL}/getTotalProceduresByOperatingRoomByDates/${start}&${end}`);
  }

  // getTotalProceduresByDateGroupMonths(start: string, end: string){
  //   return this.http.get<TotalProceduresByMonth>(`${this.baseURL}${this.apiURL}/getTotalProceduresByOperatingRoomByDates/${start}&${end}`);
  // }

}

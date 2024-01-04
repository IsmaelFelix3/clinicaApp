import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuirofanosRequest, SchedulesOperatingRoomsRequest } from 'app/interfaces/Quirofanos.interface';

@Injectable({
  providedIn: 'root'
})
export class QuirofanosService {

  baseURL = 'http://localhost:8000/api/';
  apiURL = 'quirofanos';

  constructor(public http: HttpClient) { }

  getQuirofanos(){
    return this.http.get<QuirofanosRequest>(`${this.baseURL}${this.apiURL}/getOperatingRooms`);
  }

  getHorarioQuirofano(quirofano: string){
    return this.http.get<SchedulesOperatingRoomsRequest>(`${this.baseURL}${this.apiURL}/getSchedulesOperatingRooms/${quirofano}`);
  }

}

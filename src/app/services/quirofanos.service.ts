import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuirofanosRequest, SchedulesOperatingRoomsRequest } from 'app/interfaces/Quirofanos.interface';
import { environment } from 'environments/environment';


const urlApi: string = environment.api;
const urlEndpoint: string = environment.quirofanosEndpoint

@Injectable({
  providedIn: 'root'
})
export class QuirofanosService {

  baseURL = 'http://localhost:8000/api/';
  apiURL = 'quirofanos/';

  constructor(public http: HttpClient) { }

  getQuirofanos(){
    return this.http.get<QuirofanosRequest>(`${urlApi}${urlEndpoint}getOperatingRooms`);
  }

  getHorarioQuirofano(quirofano: string){
    return this.http.get<SchedulesOperatingRoomsRequest>(`${urlApi}${urlEndpoint}getSchedulesOperatingRooms/${quirofano}`);
  }

}

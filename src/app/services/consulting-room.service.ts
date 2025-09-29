import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consultorio } from 'app/interfaces/Consultorio';
import { environment } from 'environments/environment';

const urlApi: string = environment.api;
const urlEndpoint: string = environment.consultingRoomEndpoint

@Injectable({
  providedIn: 'root'
})
export class ConsultingRoomService {

  constructor(public http: HttpClient) { }

  getRecords(){
    return this.http.get<Consultorio>(`${urlApi}${urlEndpoint}`);
  }

  getConsultingRoomByFloorId(id: number){
    return this.http.get<Consultorio>(`${urlApi}${urlEndpoint}getConsultingRoomByFloorId/${id}`);
  }

}

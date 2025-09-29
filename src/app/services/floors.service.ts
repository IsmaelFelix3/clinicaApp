import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Piso } from 'app/interfaces/Piso';
import { environment } from 'environments/environment';

const urlApi: string = environment.api;
const urlEndpoint: string = environment.floorsEndpoint

@Injectable({
  providedIn: 'root'
})
export class FloorsService {

  constructor(public http:HttpClient) { }

  getRecords(){
    return this.http.get<Piso>(`${urlApi}${urlEndpoint}`);
  }

  getFloorsByBuildingId(id: number){
    return this.http.get<Piso>(`${urlApi}${urlEndpoint}getFloorByBuildingId/${id}`);
  }

}

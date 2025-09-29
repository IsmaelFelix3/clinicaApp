import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consultorio } from 'app/interfaces/Consultorio';
import { Edificio } from 'app/interfaces/Edificio';
import { environment } from 'environments/environment';

const urlApi: string = environment.api;
const urlEndpoint: string = environment.buildingEndpoint

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

   constructor(public http: HttpClient) { }

    getRecords(){
      return this.http.get<Edificio>(`${urlApi}${urlEndpoint}`);
    }
}

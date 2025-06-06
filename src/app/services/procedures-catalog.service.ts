import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatalogoProcedimientos } from 'app/interfaces/CatalogoProcedimientos';
import { environment } from 'environments/environment';

const urlApi: string = environment.api;
const urlEndpoint: string = environment.procedureCatalogEndpoint

@Injectable({
  providedIn: 'root'
})
export class ProceduresCatalogService {

  constructor(public http: HttpClient) { }

  getAllPatients(operatingRoomId: number){
    return this.http.get<CatalogoProcedimientos>(`${urlApi}${urlEndpoint}getProceduresCatalogByOperatingRoom/${operatingRoomId}`);
  }

  getProceduresByOperatingRoom(operatingRoomId: number){
    return this.http.get<CatalogoProcedimientos>(`${urlApi}${urlEndpoint}getProceduresCatalogByOperatingRoom/${operatingRoomId}`);
  }
}

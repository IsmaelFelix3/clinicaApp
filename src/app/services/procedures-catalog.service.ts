import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatalogoProcedimientos } from 'app/interfaces/CatalogoProcedimientos';

@Injectable({
  providedIn: 'root'
})
export class ProceduresCatalogService {

  constructor(public http: HttpClient) { }

  getAllPatients(operatingRoomId: number){
    return this.http.get<CatalogoProcedimientos>(`http://localhost:8000/api/catalogoProcedimiento/getProceduresCatalogByOperatingRoom/${operatingRoomId}`);
  }
}

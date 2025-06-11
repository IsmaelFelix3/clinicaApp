import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatalogoProcedimientos, DetallesProcedimientoPost, DetallesProcedimientoUpdate, DetallesProcedure } from 'app/interfaces/CatalogoProcedimientos';
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

  getAllProceduresDetails(){
     return this.http.get<CatalogoProcedimientos>(`${urlApi}${urlEndpoint}getProceduresCatalog/`);
  }

  getProceduresByOperatingRoom(operatingRoomId: number){
    return this.http.get<CatalogoProcedimientos>(`${urlApi}${urlEndpoint}getProceduresCatalogByOperatingRoom/${operatingRoomId}`);
  }

  getProcedureConfigurationDetails(idProcedimiento:  number){
    return this.http.get<DetallesProcedure>(`${urlApi}${urlEndpoint}getProcedureConfigurationDetails/${idProcedimiento}`);
  }

  updateProcedureConfigurationDetails(procedureDetails: DetallesProcedimientoUpdate,idProcedimiento:  number){
    return this.http.put(`${urlApi}${urlEndpoint}updateProcedureConfigurationDetails/${idProcedimiento}`, procedureDetails);
  }

  addProcedureConfigurationDetails(procedureDetails: DetallesProcedimientoPost){
    return this.http.post(`${urlApi}${urlEndpoint}postProceduresCatalog/`, procedureDetails);

  }

  deleteProcedureConfigurationDetails(idProcedure: number){
    return this.http.delete(`${urlApi}${urlEndpoint}${idProcedure}`);

  }
}

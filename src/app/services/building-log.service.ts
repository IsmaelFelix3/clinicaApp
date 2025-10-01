import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BuildingLogRecordsRequest, Registro, RegistroEdit, RegistroPost } from 'app/interfaces/Bitacora';
import { environment } from 'environments/environment';

const urlApi: string = environment.api;
const urlEndpoint: string = environment.buildingLogEndpoint

@Injectable({
  providedIn: 'root'
})
export class BuildingLogService {

   constructor(public http: HttpClient) { }

      getRecords(){
        return this.http.get<BuildingLogRecordsRequest>(`${urlApi}${urlEndpoint}getBitadoraRecords`);
      }

      getBuildingLogById(id: number){
        return this.http.get<RegistroEdit>(`${urlApi}${urlEndpoint}getRecordById/${id}`);
      }

      addBuildingLog(body: RegistroPost){
        return this.http.post(`${urlApi}${urlEndpoint}postBitacoraRecord`,body);
      }

      editBuildingLog(body: RegistroEdit){
        return this.http.post(`${urlApi}${urlEndpoint}editRecord`, body);
      }

      deleteBuildingLog(id: number){
        return this.http.delete(`${urlApi}${urlEndpoint}deleteRecord/${id}`);
      }

}

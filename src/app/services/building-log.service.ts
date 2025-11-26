import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BuildingLogRecordsRequest, BuildingLogReport, RegistroEdit, RegistroPost, RegistrosReport } from 'app/interfaces/Bitacora';
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

   getBuildingLogReport(start: string, end: string){
    console.log(start, end)
    return this.http.get<BuildingLogReport>(`${urlApi}${urlEndpoint}getBuildingLogReport/${start}&${end}`);
  }

  getBuildingLogReportTotal(start: string, end: string){
    console.log(start, end)
    return this.http.get<BuildingLogReport>(`${urlApi}${urlEndpoint}getBuildingLogReportTotal/${start}&${end}`);
  }

  getBuildingLogByDay(start: string, ){
    console.log(start)
    return this.http.get<RegistrosReport>(`${urlApi}${urlEndpoint}getBuildingLogByDay/${start}`);
  }

}

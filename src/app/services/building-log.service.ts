import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BuildingLogRecordsRequest } from 'app/interfaces/Bitacora';
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

      // getBankById(id: number){
      //   return this.http.get<BancoById>(`${urlApi}${urlEndpoint}getBankById/${id}`);
      // }

      // addBank(body: BancoAdd){
      //   return this.http.post(`${urlApi}${urlEndpoint}postBank`,body);
      // }

      // editBank(body: Banco){
      //   return this.http.post(`${urlApi}${urlEndpoint}editBank`, body);
      // }

      // deleteBank(id: number){
      //   return this.http.delete(`${urlApi}${urlEndpoint}deleteBank/${id}`);
      // }

}

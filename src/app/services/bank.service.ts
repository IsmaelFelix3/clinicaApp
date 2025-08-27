import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Banco, BancoAdd, BancoById, BancoRequest } from 'app/interfaces/Banco';
import { environment } from 'environments/environment';

const urlApi: string = environment.api;
const urlEndpoint: string = environment.banksEndpoint

@Injectable({
  providedIn: 'root'
})
export class BankService {

   constructor(public http: HttpClient) { }

    getBanks(){
      return this.http.get<BancoRequest>(`${urlApi}${urlEndpoint}getBanks`);
    }

    getBankById(id: number){
      return this.http.get<BancoById>(`${urlApi}${urlEndpoint}getBankById/${id}`);
    }

    addBank(body: BancoAdd){
      return this.http.post(`${urlApi}${urlEndpoint}postBank`,body);
    }

    editBank(body: Banco){
      return this.http.post(`${urlApi}${urlEndpoint}editBank`, body);
    }

    deleteBank(id: number){
      return this.http.delete(`${urlApi}${urlEndpoint}deleteBank/${id}`);
    }

}

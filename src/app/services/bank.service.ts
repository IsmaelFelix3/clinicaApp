import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BancoRequest } from 'app/interfaces/Banco';
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

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoProcedimiento } from 'app/interfaces/TipoProcedimiento';

@Injectable({
  providedIn: 'root'
})
export class ProceduresTypeService {

  baseURL = 'http://localhost:8000/api/';
  apiURL = 'tipoProcedimiento';

  constructor(public http: HttpClient) { }

  getProcedure(){
    return this.http.get<TipoProcedimiento>(`${this.baseURL}${this.apiURL}/getProceduresType/`);
  }
}

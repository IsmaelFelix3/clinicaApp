import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoProcedimiento } from 'app/interfaces/TipoProcedimiento';
import { environment } from 'environments/environment';

const urlApi: string = environment.api;
const urlEndpoint: string = 'tipoProcedimiento/'

@Injectable({
  providedIn: 'root'
})
export class ProceduresTypeService {

  apiURL = '';

  constructor(public http: HttpClient) { }

  getProcedure(){
    return this.http.get<TipoProcedimiento>(`${urlApi}${urlEndpoint}getProceduresType/`);
  }
}

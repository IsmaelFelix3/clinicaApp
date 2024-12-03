import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MotivoConsultaRequest } from 'app/interfaces/MotivoConsulta';
import { environment } from 'environments/environment';

const urlApi: string = environment.api;
const urlEndpoint: string = environment.motivoConsultaEndpoint;

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {


  constructor(private http: HttpClient) { }

  getMotivoConsulta(){
    return this.http.get<MotivoConsultaRequest>(`${urlApi}${urlEndpoint}getMotivoConsulta/`);
  }
}

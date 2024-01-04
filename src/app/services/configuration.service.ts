import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MotivoConsultaRequest } from 'app/interfaces/MotivoConsulta';

const apiUrl: string = 'motivoConsulta';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {


  constructor(private http: HttpClient) { }

  getMotivoConsulta(){
    return this.http.get<MotivoConsultaRequest>(`http://localhost:8000/api/${apiUrl}/getMotivoConsulta/`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EspecialidadRequest } from 'app/interfaces/Especialidad';
import { environment } from 'environments/environment';

const urlApi: string = environment.api;
const urlEndpoint: string = environment.specialtiesEndpoint;

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService { constructor(public http: HttpClient) { }

  getSpecialties(){
    return this.http.get<EspecialidadRequest>(`${urlApi}${urlEndpoint}getSpecialties`);
  }

}

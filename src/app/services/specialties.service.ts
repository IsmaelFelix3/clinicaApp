import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Especialidad, EspecialidadById, EspecialidadPost, EspecialidadRequest } from 'app/interfaces/Especialidad';
import { environment } from 'environments/environment';

const urlApi: string = environment.api;
const urlEndpoint: string = environment.specialtiesEndpoint;

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {

  dialogData!: Especialidad;

  getDialogData() {
    return this.dialogData;
  }

  constructor(public http: HttpClient) { }

  getSpecialties(){
    return this.http.get<EspecialidadRequest>(`${urlApi}${urlEndpoint}getSpecialties`);
  }

  getSpecialty(id: number){
    return this.http.get<EspecialidadById>(`${urlApi}${urlEndpoint}getSpecialtyById/${id}`);
  }

  addSpecialty(body: EspecialidadPost){
    return this.http.post(`${urlApi}${urlEndpoint}/postSpecialty`,body)
  }

  editSpecialty(body: Especialidad){
    return this.http.post(`${urlApi}${urlEndpoint}/editSpecialty`,body)
  }

  deleteSpecialty(id: number){
    return this.http.delete(`${urlApi}${urlEndpoint}/deleteSpecialty/${id}`)
  }

}

import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Doctors } from './doctors.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Medico, MedicoByEmail, MedicoById, MedicoUpdate, Medicos } from 'app/interfaces/Medico.interface';
import { AuthService } from '../../../core/service/auth.service';
import { environment } from 'environments/environment';
@Injectable()
export class DoctorsService extends UnsubscribeOnDestroyAdapter {


  private readonly API_URL = 'assets/data/doctors.json';
  urlApi: string = environment.api;
  urlEndpoint: string = environment.medicosEndpoint;
  isTblLoading = true;
  dataChange: BehaviorSubject<Medico[]> = new BehaviorSubject<Medico[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Doctors;
  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): Medico[] {
    console.log('entro',this.dataChange)
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllDoctorss(){
    return this.httpClient.get<Medicos>(`${this.urlApi}${this.urlEndpoint}`);
  }

  getDoctorByEmail( correo: string ){
    return this.httpClient.post<MedicoByEmail>(`${this.urlApi}${this.urlEndpoint}getMedicoByEmail`,{correo});
  }

  getDoctorById(idMedico: number){
    return this.httpClient.get<MedicoById>(`${this.urlApi}${this.urlEndpoint}${idMedico}`);
  }

  addDoctor(doctor: Medico){
    return this.httpClient.post(`${this.urlApi}medicos`, doctor);
  }

  updateDoctor(doctor: MedicoUpdate, idMedico: number){
    return this.httpClient.put(`${this.urlApi}${this.urlEndpoint}${idMedico}`, doctor);
  }

  deleteDoctor(idMedico: number){
   return this.httpClient.delete(`${this.urlApi}${this.urlEndpoint}${idMedico}`);
  }
}

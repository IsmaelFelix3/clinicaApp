import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Doctors } from './doctors.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Medico, MedicoById, MedicoUpdate, Medicos } from 'app/interfaces/Medico.interface';
@Injectable()
export class DoctorsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/doctors.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Medico[]> = new BehaviorSubject<Medico[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Doctors;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Medico[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllDoctorss(){

    return this.httpClient.get<Medicos>(`http://localhost:8000/api/medicos`);
    // this.subs.sink = this.httpClient.get<Medicos>(`http://localhost:8000/api/medicos`).subscribe({
    //   next: (data) => {
    //     this.isTblLoading = false;
    //     this.dataChange.next(data.medicos);
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     this.isTblLoading = false;
    //     console.log(error.name + ' ' + error.message);
    //   },
    // });
  }

  getDoctorById(idMedico: number){
    return this.httpClient.get<MedicoById>(`http://localhost:8000/api/medicos/${idMedico}`);
  }

  addDoctor(doctor: Medico){
    return this.httpClient.post(`http://localhost:8000/api/medicos`, doctor);
  }

  updateDoctor(doctor: MedicoUpdate, idMedico: number){
    return this.httpClient.put(`http://localhost:8000/api/medicos/${idMedico}`, doctor);
  }

  deleteDoctor(idMedico: number){
   return this.httpClient.delete(`http://localhost:8000/api/medicos/${idMedico}`);
  }
}
